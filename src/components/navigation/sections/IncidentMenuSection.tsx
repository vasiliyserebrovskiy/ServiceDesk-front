import { useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  closeAll: () => void;
};

export default function IncidentMenuSection({ closeAll }: Props) {
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
        Incident
      </button>

      {isOpen && (
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
  );
}
