import { useEffect, useRef, useState } from "react";

import IncidentsMenuSection from "./sections/IncidentsMenuSection";
import MyIncidentsMenuSection from "./sections/MyIncidentsMenuSection";
// import ProblemsMenuSection from "./sections/ProblemsMenuSection";

export default function TicketsMenu() {
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
        Service Desk
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
          <MyIncidentsMenuSection closeAll={closeAll} />
          <IncidentsMenuSection closeAll={closeAll} />

          {/* <ProblemsMenuSection closeAll={closeAll} /> */}
        </div>
      )}
    </div>
  );
}
