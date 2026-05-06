import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearError } from "../../features/error/errorSlice";

export default function ErrorToast() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.error.message);

  // авто-удаление сообщения
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 4500);

    return () => clearTimeout(timer);
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div
      className="
        fixed top-5 left-1/2 -translate-x-1/2 w-64 text-center
        bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-50
        backdrop-blur-md border border-white/10
        animate-toast-in
      "
    >
      {message}
    </div>
  );
}

/*
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearError } from "../../features/error/errorSlice";

export default function ErrorToast() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.error.message);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearError());
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div
      className={`
  fixed top-5 left-1/2 -translate-x-1/2 w-64 text-center
  bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-50
  backdrop-blur-md border border-white/10
  transition-all duration-300 ease-out
  ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
`}
    >
      {message}
    </div>
  );
}
*/
