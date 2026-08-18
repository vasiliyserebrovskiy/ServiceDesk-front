import { useRef } from "react";
import { Calendar } from "lucide-react";
import { useField } from "formik";

type Props = {
  label: string;
  name: string; // "actualStart" | "actualEnd"
};

function toInputValue(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 16); // "2026-08-17T13:40:00" -> "2026-08-17T13:40"
}

function fromInputValue(value: string): string | null {
  return value ? `${value}:00` : null; // adding seconds to the format for back sync
}

function FormDateTimeField({ label, name }: Props) {
  const [field, , helpers] = useField<string | null>(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatted = field.value
    ? new Date(field.value).toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "-";

  return (
    <div className="flex flex-col text-black">
      <label>{label}</label>
      <div className="relative border rounded p-2 flex items-center justify-between bg-white">
        <span>{formatted}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.showPicker?.()}
          className="text-gray-500"
        >
          <Calendar size={18} />
        </button>
        <input
          ref={inputRef}
          type="datetime-local"
          className="absolute inset-0 opacity-0 pointer-events-none"
          value={toInputValue(field.value)}
          onChange={(e) => helpers.setValue(fromInputValue(e.target.value))}
        />
      </div>
    </div>
  );
}

export default FormDateTimeField;
