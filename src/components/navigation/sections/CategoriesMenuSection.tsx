import { useState } from "react";
import { NavLink } from "react-router-dom";
import SubcategoriesMenuSection from "./SubcategoriesMenuSection";

type Props = {
  closeAll: () => void;
};

export default function CategoriesMenuSection({ closeAll }: Props) {
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
        Category
      </button>

      {isOpen && (
        <div className="ml-4 mt-2 flex flex-col gap-1">
          <NavLink
            to="/categories/create"
            onClick={closeAll}
            className="hover:text-blue-600"
          >
            Create New
          </NavLink>

          <NavLink
            to="/categories/all"
            onClick={closeAll}
            className="hover:text-blue-600"
          >
            Category List
          </NavLink>

          <SubcategoriesMenuSection closeAll={closeAll} />
        </div>
      )}
    </div>
  );
}
