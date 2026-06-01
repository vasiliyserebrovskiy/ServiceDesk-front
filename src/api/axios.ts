import axios from "axios";
import { clearAuth } from "../features/auth/authSlice";
import { setError } from "../features/error/errorSlice";
import type { AppDispatch } from "../app/store";

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
};

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

let dispatch: AppDispatch | null = null;

export const injectDispatch = (d: AppDispatch) => {
  dispatch = d;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message;

    const isAuthRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh-token");

    if (status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/v1/auth/refresh-token");
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        dispatch?.(clearAuth());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      const isAuthStateError =
        message?.includes("not active") || message?.includes("locked");

      if (isAuthStateError) {
        dispatch?.(clearAuth());
        dispatch?.(setError(message));
        return Promise.reject(error);
      }
    }

    const skipToast = error.config?.meta?.skipToast;

    if (!isAuthRequest && !skipToast) {
      const finalMessage = message || error.message || "Something went wrong";
      dispatch?.(setError(finalMessage));
    }

    return Promise.reject(error);
  },
);
