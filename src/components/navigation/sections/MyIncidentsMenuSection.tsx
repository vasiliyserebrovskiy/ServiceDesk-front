import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuArrow from "../MenuArrow";

type Props = {
  closeAll: () => void;
};

export default function MyIncidentsMenuSection({ closeAll }: Props) {
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
        <MenuArrow label="My Incidents" isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="ml-4 mt-2 flex flex-col gap-1">
          <NavLink
            to="/incidents/my/open"
            onClick={closeAll}
            className="hover:text-blue-600"
          >
            Open
          </NavLink>

          <NavLink
            to="/incidents/my/assigned"
            onClick={closeAll}
            className="hover:text-blue-600"
          >
            Assigned to me
          </NavLink>

          <NavLink
            to="/incidents/my/closed"
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
