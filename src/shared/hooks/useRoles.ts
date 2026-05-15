import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../app/store";
import {
  selectRoles,
  selectRolesLoading,
} from "../../features/roles/roleSlice";
import { loadRoles } from "../../features/roles/roleActions";

export const useRoles = () => {
  const dispatch = useDispatch<AppDispatch>();

  const roles = useSelector(selectRoles);
  const isLoading = useSelector(selectRolesLoading);

  useEffect(() => {
    if (!roles) {
      loadRoles(dispatch);
    }
  }, [roles, dispatch]);

  return {
    roles,
    isLoading,
  };
};
