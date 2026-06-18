import { Field, useField } from "formik";

type Props = {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  fieldClassName?: string;
  divClassName?: string;
};

function FormEditField({
  label,
  fieldClassName = "",
  required,
  divClassName = "flex flex-col text-black",
  ...props
}: Props) {
  const [field, meta] = useField(props);

  return (
    <div className={divClassName}>
      <label htmlFor={props.name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Field
        {...field}
        {...props}
        className={`border p-2 rounded ${fieldClassName}`}
      />

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm">{meta.error}</span>
      )}
    </div>
  );
}

export default FormEditField;
