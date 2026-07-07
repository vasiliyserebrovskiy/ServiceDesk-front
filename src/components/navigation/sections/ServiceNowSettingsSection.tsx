import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuArrow from "../MenuArrow";

type Props = {
  closeAll: () => void;
};

export default function ServiceNowSettingsSection({ closeAll }: Props) {
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
        <MenuArrow label="ServiceNow Integration" isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="ml-4 mt-2 flex flex-col gap-1">
          <NavLink
            to="/admin/servicenowsettings"
            className="hover:text-blue-600"
            // close the menu after selecting
            onClick={closeAll}
          >
            ServiceNow Settings
          </NavLink>
        </div>
      )}
    </div>
  );
}
