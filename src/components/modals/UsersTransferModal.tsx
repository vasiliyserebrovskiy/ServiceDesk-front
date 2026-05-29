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
  const [highlightedLeft, setHighlightedLeft] = useState<User | null>(null);
  const [highlightedRight, setHighlightedRight] = useState<User | null>(null);

  if (!open) return null;

  const availableUsers = allUsers.filter(
    (user) => !currentSelected.some((s) => s.id === user.id),
  );

  const moveToGroup = () => {
    if (!highlightedLeft) return;
    setCurrentSelected((prev) => [...prev, highlightedLeft]);
    setHighlightedLeft(null);
  };

  const moveToAvailable = () => {
    if (!highlightedRight) return;
    setCurrentSelected((prev) =>
      prev.filter((u) => u.id !== highlightedRight.id),
    );
    setHighlightedRight(null);
  };

  const rowClass = (isHighlighted: boolean) =>
    `flex items-center p-2 border-b cursor-pointer select-none ${
      isHighlighted ? "bg-blue-100 font-medium" : "hover:bg-gray-50"
    }`;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-225">
        <div className="bg-gray-200 p-2">
          <h2 className="text-[#0d2b5c] text-lg font-bold">Edit Group Users</h2>
        </div>

        <div className="flex gap-4 items-center mt-2">
          {/* ALL USERS */}
          <div className="flex-1">
            <h3 className="font-medium mb-3 text-black">All Users</h3>
            <div className="border rounded h-100 overflow-auto">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  className={rowClass(highlightedLeft?.id === user.id)}
                  onClick={() =>
                    setHighlightedLeft(
                      highlightedLeft?.id === user.id ? null : user,
                    )
                  }
                >
                  {user.lastname} {user.firstname}
                </div>
              ))}
            </div>
          </div>

          {/* TRANSFER BUTTONS */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={moveToGroup}
              disabled={!highlightedLeft}
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-30 hover:bg-blue-800 transition duration-150 cursor-pointer"
            >
              ›
            </button>
            <button
              type="button"
              onClick={moveToAvailable}
              disabled={!highlightedRight}
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-30 hover:bg-blue-800 transition duration-150 cursor-pointer"
            >
              ‹
            </button>
          </div>

          {/* GROUP USERS */}
          <div className="flex-1">
            <h3 className="font-medium mb-3 text-black">Group Members</h3>
            <div className="border rounded h-100 overflow-auto">
              {currentSelected.map((user) => (
                <div
                  key={user.id}
                  className={rowClass(highlightedRight?.id === user.id)}
                  onClick={() =>
                    setHighlightedRight(
                      highlightedRight?.id === user.id ? null : user,
                    )
                  }
                >
                  {user.lastname} {user.firstname}
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
            className="bg-red-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-red-800 active:scale-95 transition duration-150"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(currentSelected)}
            className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
