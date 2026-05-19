import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;

  label?: string;
  placeholder?: string;

  className?: string;
  labelClassName?: string;
  inputClassName?: string;

  onBlur?: () => void;
};

export default function PasswordField({
  value,
  onChange,
  label = "Password",
  placeholder = "password",
  className = "",
  labelClassName = "text-sm text-gray-600",
  inputClassName = "border p-2 rounded w-full pr-10",
  onBlur,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className={labelClassName}>{label}</label>

      <div className="relative">
        <input
          className={inputClassName}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
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

// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// type Props = {
//   value: string;
//   onChange: (value: string) => void;
// };

// export default function PasswordField({ value, onChange }: Props) {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm text-gray-600">Password</label>

//       <div className="relative">
//         <input
//           className="border p-2 rounded w-full pr-10"
//           type={show ? "text" : "password"}
//           placeholder="password"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />

//         <button
//           type="button"
//           onClick={() => setShow((prev) => !prev)}
//           className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
//         >
//           {show ? <EyeOff size={18} /> : <Eye size={18} />}
//         </button>
//       </div>
//     </div>
//   );
// }
