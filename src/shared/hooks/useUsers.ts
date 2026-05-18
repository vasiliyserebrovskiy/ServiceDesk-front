import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getUsersThunk,
  createUserThunk,
} from "../../features/users/usersSlice";
import type { CreateUserDto } from "../../shared/types/usersTypes";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  /**
   * Load all users
   */
  const loadUsers = () => {
    dispatch(getUsersThunk());
  };

  /**
   * Create new user
   * returns created user (useful for forms / notifications)
   */
  const createUser = async (data: CreateUserDto) => {
    const result = await dispatch(createUserThunk(data));

    // unwrap payload safely
    return result.payload;
  };

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
  };
};
