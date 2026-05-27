import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getGroupsThunk,
  createGroupThunk,
  updateGroupByIdThunk,
  deleteGroupByIdThunk,
  getGroupByIdThunk,
} from "../../features/groups/groupsSlice";
import type { CreateGroupDto, UpdateGroupDto } from "../types/groupsTypes";

export const useGroups = () => {
  const dispatch = useAppDispatch();

  const groups = useAppSelector((state) => state.groups.groups);
  const loading = useAppSelector((state) => state.groups.loading);
  const error = useAppSelector((state) => state.groups.error);

  /**
   * Load all groups
   */
  const loadGroups = useCallback(() => {
    dispatch(getGroupsThunk());
  }, [dispatch]);

  /**
   * Create new group
   */
  const createGroup = useCallback(
    async (data: CreateGroupDto) => {
      return await dispatch(createGroupThunk(data)).unwrap();
    },
    [dispatch],
  );

  /**
   * Update group by id
   */
  const updateGroupById = useCallback(
    async (id: string, data: UpdateGroupDto) => {
      return await dispatch(updateGroupByIdThunk({ id, data })).unwrap();
    },
    [dispatch],
  );

  /**
   * Delete group by id
   */
  const deleteGroupById = useCallback(
    async (id: string) => {
      return await dispatch(deleteGroupByIdThunk(id)).unwrap();
    },
    [dispatch],
  );

  /**
   * Get group by id
   */
  const getGroupById = useCallback(
    async (id: string) => {
      return await dispatch(getGroupByIdThunk(id)).unwrap();
    },
    [dispatch],
  );
  return {
    groups,
    loading,
    error,
    loadGroups,
    createGroup,
    updateGroupById,
    deleteGroupById,
    getGroupById,
  };
};
