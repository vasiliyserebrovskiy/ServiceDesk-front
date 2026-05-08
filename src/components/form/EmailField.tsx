type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function EmailField({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">Email</label>

      <input
        className="border p-2 rounded"
        type="email"
        placeholder="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
