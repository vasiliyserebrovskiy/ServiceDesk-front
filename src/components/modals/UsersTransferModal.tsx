import { useState } from "react";
import type { User } from "../../shared/types/usersTypes";

type Props = {
  open: boolean;
  allUsers: User[];
  selectedUsers: User[];

  onClose: () => void;
  onSave: (users: User[]) => void;
};

export default function UsersTransferModal({
  open,
  allUsers,
  selectedUsers,
  onClose,
  onSave,
}: Props) {
  const [currentSelected, setCurrentSelected] = useState<User[]>(selectedUsers);

  if (!open) return null;

  const availableUsers = allUsers.filter(
    (user) => !currentSelected.some((selected) => selected.id === user.id),
  );

  const addUser = (user: User) => {
    setCurrentSelected((prev) => [...prev, user]);
  };

  const removeUser = (user: User) => {
    setCurrentSelected((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[900px]">
        <h2 className="text-xl font-semibold mb-6">Edit Group Users</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* ALL USERS */}
          <div>
            <h3 className="font-medium mb-3">All Users</h3>

            <div className="border rounded h-[400px] overflow-auto">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <span>
                    {user.lastname} {user.firstname}
                  </span>

                  <button
                    type="button"
                    onClick={() => addUser(user)}
                    className="text-blue-600"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* GROUP USERS */}
          <div>
            <h3 className="font-medium mb-3">Group Members</h3>

            <div className="border rounded h-[400px] overflow-auto">
              {currentSelected.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <span>
                    {user.lastname} {user.firstname}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeUser(user)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSave(currentSelected)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
