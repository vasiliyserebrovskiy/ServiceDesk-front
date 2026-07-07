import { useEffect, useRef, useState } from "react";
import RoleMenuSection from "./sections/RoleMenuSection";
import UserMenuSection from "./sections/UserMenuSection";
import ServiceNowSettingsSection from "./sections/ServiceNowSettingsSection";

export default function AdminMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // link to the menu container
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeAll = () => {
    setIsOpen(false);
  };

  // closing when clicked outside the menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

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
          <RoleMenuSection closeAll={closeAll} />
          <UserMenuSection closeAll={closeAll} />
          <ServiceNowSettingsSection closeAll={closeAll} />
        </div>
      )}
    </div>
  );
}
