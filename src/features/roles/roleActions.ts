import { fetchRolesApi } from "./roleApi";
import { setRoles, setLoading } from "./roleSlice";
import type { AppDispatch } from "../../app/store";

export const loadRoles = async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    const data = await fetchRolesApi();

    dispatch(setRoles(data));
  } finally {
    dispatch(setLoading(false));
  }
};
