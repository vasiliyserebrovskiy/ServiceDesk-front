import { Field, useField } from "formik";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  name: string;
  required?: boolean;
  className?: string;
  options: Option[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function FormListField({
  label,
  className = "",
  options,
  required,
  onChange,
  ...props
}: Props) {
  const [field, meta] = useField(props);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    field.onChange(e);
    onChange?.(e);
  };

  return (
    <div className="flex flex-col text-black">
      <label htmlFor={props.name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Field
        as="select"
        {...field}
        {...props}
        onChange={handleChange}
        className={`border p-2 rounded ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm">{meta.error}</span>
      )}
    </div>
  );
}

export default FormListField;
