import axios from "axios";
import { store } from "../app/store";
import { clearAuth } from "../features/auth/authSlice";
import { setError } from "../features/error/errorSlice";

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
};

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

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

    // =========================
    // 401 → refresh flow
    // =========================
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
        store.dispatch(clearAuth());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // =========================
    // 403 → AUTH STATE errors
    // (blocked / inactive)
    // =========================
    if (status === 403) {
      const isAuthStateError =
        message?.includes("not active") || message?.includes("locked");

      if (isAuthStateError) {
        store.dispatch(clearAuth());
        store.dispatch(setError(message)); // here we need banner
        return Promise.reject(error);
      }
    }

    // =========================
    // LOGIN PAGE errors (401)
    // did not otuch → to avoid breaking the login UI
    // =========================

    // =========================
    // GLOBAL errors (toast)
    // =========================
    const skipToast = error.config?.meta?.skipToast;

    if (!isAuthRequest && !skipToast) {
      const finalMessage = message || error.message || "Something went wrong";

      store.dispatch(setError(finalMessage));
    }

    return Promise.reject(error);
  },
);
