import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PasswordField({ value, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">Password</label>

      <div className="relative">
        <input
          className="border p-2 rounded w-full pr-10"
          type={show ? "text" : "password"}
          placeholder="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
