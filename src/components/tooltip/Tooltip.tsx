import { type ReactNode, useState } from "react";

type TooltipProps = {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom";
};

export default function Tooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionClasses =
    position === "top" ? "bottom-full mb-2" : "top-full mt-2";

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={`absolute left-1/2 -translate-x-1/2 ${positionClasses} z-50 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-lg`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
