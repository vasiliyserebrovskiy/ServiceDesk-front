import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AllMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [problemOpen, setProblemOpen] = useState(false);

  return (
    <div className="relative">
      {/* MAIN BUTTON */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white cursor-pointer"
      >
        All
      </button>

      {/* DROPDOWN */}

      {isOpen && (
        <div className="absolute top-10 left-0 bg-white text-black rounded-md shadow-lg min-w-[220px] p-3 z-50">
          {/* INCIDENT */}

          <div className="mb-3">
            <button
              onClick={() => setIncidentOpen(!incidentOpen)}
              className="font-semibold w-full text-left"
            >
              Incident
            </button>

            {incidentOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-1">
                <NavLink to="/incidents/open" className="hover:text-blue-600">
                  Open
                </NavLink>

                <NavLink to="/incidents/create" className="hover:text-blue-600">
                  Create New
                </NavLink>

                <NavLink to="/incidents/closed" className="hover:text-blue-600">
                  Closed
                </NavLink>
              </div>
            )}
          </div>

          {/* PROBLEM */}

          <div>
            <button
              onClick={() => setProblemOpen(!problemOpen)}
              className="font-semibold w-full text-left"
            >
              Problem
            </button>

            {problemOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-1">
                <NavLink to="/problems/open" className="hover:text-blue-600">
                  Open
                </NavLink>

                <NavLink to="/problems/create" className="hover:text-blue-600">
                  Create New
                </NavLink>

                <NavLink to="/problems/closed" className="hover:text-blue-600">
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
