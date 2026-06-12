import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getCIsThunk,
  createCIThunk,
  updateCIByIdThunk,
  deleteCIByIdThunk,
  getCIByIdThunk,
} from "../../features/cis/cisSlice";
import type { CreateCIDto, UpdateCIDto } from "../types/cisTypes";

export const useCIs = () => {
  const dispatch = useAppDispatch();

  const cis = useAppSelector((state) => state.cis.cis);
  const loading = useAppSelector((state) => state.cis.loading);
  const error = useAppSelector((state) => state.cis.error);

  /**
   * Load all CIs
   */
  const loadCIs = useCallback(() => {
    dispatch(getCIsThunk());
  }, [dispatch]);

  /**
   * Create new CI
   */
  const createCI = useCallback(
    async (data: CreateCIDto) => {
      return await dispatch(createCIThunk(data)).unwrap();
    },
    [dispatch],
  );

  /**
   * Update CI by id
   */
  const updateCIById = useCallback(
    async (id: string, data: UpdateCIDto) => {
      return await dispatch(updateCIByIdThunk({ id, data })).unwrap();
    },
    [dispatch],
  );

  /**
   * Delete CI by id
   */
  const deleteCIById = useCallback(
    async (id: string) => {
      return await dispatch(deleteCIByIdThunk(id)).unwrap();
    },
    [dispatch],
  );

  /**
   * Get CI by id
   */
  const getCIById = useCallback(
    async (id: string) => {
      return await dispatch(getCIByIdThunk(id)).unwrap();
    },
    [dispatch],
  );
  return {
    cis,
    loading,
    error,
    loadCIs,
    createCI,
    updateCIById,
    deleteCIById,
    getCIById,
  };
};
