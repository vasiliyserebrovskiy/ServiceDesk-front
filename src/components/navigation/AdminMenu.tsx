import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* MAIN BUTTON */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white cursor-pointer"
      >
        Administration
      </button>

      {/* DROPDOWN */}

      {isOpen && (
        <div className="absolute top-10 left-0 bg-white text-black rounded-md shadow-lg min-w-[220px] p-3 z-50">
          <div className="flex flex-col gap-2">
            <NavLink to="/admin/create-user" className="hover:text-blue-600">
              Create User
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
