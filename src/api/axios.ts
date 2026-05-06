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
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isAuthRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh-token");

    // if the access token has expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      // if refresh is already underway, we put it in the queue.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        // refresh using cookie
        await api.post("/v1/auth/refresh-token");

        processQueue(null);

        // repeating the original request
        return api(originalRequest);
      } catch (err) {
        processQueue(err);

        // if refresh is also dead → logout
        store.dispatch(clearAuth());

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // all error messages
    const skipToast = error.config?.meta?.skipToast;
    if (!isAuthRequest && !skipToast) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      store.dispatch(setError(message));
    }
    return Promise.reject(error);
  },
);
