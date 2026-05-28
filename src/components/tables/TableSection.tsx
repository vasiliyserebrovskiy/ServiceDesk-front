type Column<T> = {
  key: keyof T;
  title: string;
};

type TableSectionProps<T> = {
  title: string;
  data: T[];
  columns: Column<T>[];
  onEdit?: () => void;
};

export default function TableSection<T extends { id: string }>({
  title,
  data,
  columns,
  onEdit,
}: TableSectionProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded
            hover:bg-blue-700 transition"
          >
            Edit
          </button>
        )}
      </div>

      {/* TABLE */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th key={String(column.key)} className="text-left p-2">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b">
              {columns.map((column) => (
                <td key={String(column.key)} className="p-2">
                  {String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
