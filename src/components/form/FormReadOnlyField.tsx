type Props = {
  label?: string;
  value: string | null;
  divClassName?: string;
};

function FormReadOnlyField({
  label,
  value,
  divClassName = "flex flex-col text-black",
}: Props) {
  return (
    <div className={divClassName}>
      <label>{label}</label>
      <div className="border p-2 rounded bg-gray-100 text-gray-700">
        {value ?? ""}
      </div>
    </div>
  );
}

export default FormReadOnlyField;
