import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { meRequest } from "./authApi";
import { setAuth, clearAuth, setLoading } from "./authSlice";

export const useAuthBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));

      try {
        const user = await meRequest();
        dispatch(setAuth(user));
      } catch {
        dispatch(clearAuth());
      } finally {
        dispatch(setLoading(false));
      }
    };

    init();
  }, [dispatch]);
};
