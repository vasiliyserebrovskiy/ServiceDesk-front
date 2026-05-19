import { Field, useField } from "formik";

type Props = {
  label?: string;
  name: string;
  divClassName?: string;
  fieldClassName?: string;
  rows?: number;
};

function FormDescField({
  label,
  divClassName = "col-span-2 flex flex-col text-black",
  fieldClassName = "",
  rows = 3,
  ...props
}: Props) {
  const [field, meta] = useField(props);

  return (
    <div className={divClassName}>
      <label htmlFor={props.name}>{label}</label>

      <Field
        as="textarea"
        {...field}
        {...props}
        rows={rows}
        className={`border p-2 rounded ${fieldClassName}`}
      />

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm">{meta.error}</span>
      )}
    </div>
  );
}

export default FormDescField;
