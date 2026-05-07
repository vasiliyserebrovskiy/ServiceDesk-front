import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export default function AllMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [problemOpen, setProblemOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeAll = () => {
    setIsOpen(false);
    setIncidentOpen(false);
    setProblemOpen(false);
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
        className="text-white cursor-pointer select-none hover:text-blue-600"
      >
        All
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute top-10 left-0 bg-[#0d2b5c] text-white rounded-md shadow-lg min-w-55 p-3 z-50">
          {/* INCIDENT */}
          <div className="mb-3">
            <button
              onClick={() => setIncidentOpen((prev) => !prev)}
              className="font-semibold w-full text-left hover:text-blue-600"
            >
              Incident
            </button>

            {incidentOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-1">
                <NavLink
                  to="/incidents/open"
                  onClick={closeAll}
                  className="hover:text-blue-600"
                >
                  Open
                </NavLink>

                <NavLink
                  to="/incidents/create"
                  onClick={closeAll}
                  className="hover:text-blue-600"
                >
                  Create New
                </NavLink>

                <NavLink
                  to="/incidents/closed"
                  onClick={closeAll}
                  className="hover:text-blue-600"
                >
                  Closed
                </NavLink>
              </div>
            )}
          </div>

          {/* PROBLEM */}
          <div>
            <button
              onClick={() => setProblemOpen((prev) => !prev)}
              className="font-semibold w-full text-left hover:text-blue-600"
            >
              Problem
            </button>

            {problemOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-1">
                <NavLink
                  to="/problems/open"
                  onClick={closeAll}
                  className="hover:text-blue-600"
                >
                  Open
                </NavLink>

                <NavLink
                  to="/problems/create"
                  onClick={closeAll}
                  className="hover:text-blue-600"
                >
                  Create New
                </NavLink>

                <NavLink
                  to="/problems/closed"
                  onClick={closeAll}
                  className="hover:text-blue-600"
                >
                  Closed
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
