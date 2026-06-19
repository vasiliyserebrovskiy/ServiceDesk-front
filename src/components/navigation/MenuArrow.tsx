type Props = {
  label: string;
  isOpen: boolean;
};

function MenuArrow({ label, isOpen }: Props) {
  return (
    <div className="flex items-center">
      <span
        className={`inline-block transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
      >
        ▶
      </span>
      <span className="ml-2">{label}</span>
    </div>
  );
}

export default MenuArrow;
