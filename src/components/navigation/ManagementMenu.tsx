import { useEffect, useRef, useState } from "react";
import GroupMenuSection from "./sections/GroupMenuSection";
import CategoriesMenuSection from "./sections/CategoriesMenuSection";

export default function ManagementMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeAll = () => {
    setIsOpen(false);
  };

  // click outside
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
        Management
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
          <GroupMenuSection closeAll={closeAll} />
          <CategoriesMenuSection closeAll={closeAll} />
        </div>
      )}
    </div>
  );
}
