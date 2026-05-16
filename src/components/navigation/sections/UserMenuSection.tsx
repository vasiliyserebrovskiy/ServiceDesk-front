import { useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  closeAll: () => void;
};

export default function UserMenuSection({ closeAll }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          font-semibold
          w-full
          text-left
          hover:text-blue-600
        "
      >
        Users
      </button>

      {isOpen && (
        <div className="ml-4 mt-2 flex flex-col gap-1">
          <NavLink
            to="/admin/create-user"
            className="hover:text-blue-600"
            // close the menu after selecting
            onClick={closeAll}
          >
            Create New User
          </NavLink>
        </div>
      )}
    </div>
  );
}
