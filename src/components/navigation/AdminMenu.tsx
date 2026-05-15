import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // link to the menu container
  const menuRef = useRef<HTMLDivElement | null>(null);

  // closing when clicked outside the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // target = the clicked element
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* MAIN BUTTON */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          text-white
          cursor-pointer
          select-none
          hover:text-blue-600
        "
      >
        Administration
      </button>

      {/* DROPDOWN */}

      {isOpen && (
        <div
          className="
            absolute
            top-10
            left-0
            bg-[#0d2b5c]
            text-white
            rounded-md
            shadow-lg
            min-w-55
            p-3
            z-50
          "
        >
          <div className="flex flex-col gap-2">
            <NavLink
              to="/admin/create-user"
              className="hover:text-blue-600"
              // close the menu after selecting
              onClick={() => setIsOpen(false)}
            >
              Create User
            </NavLink>
          </div>

          <div className="flex flex-col gap-2">
            <NavLink
              to="/admin/roles"
              className="hover:text-blue-600"
              // close the menu after selecting
              onClick={() => setIsOpen(false)}
            >
              Role List
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
