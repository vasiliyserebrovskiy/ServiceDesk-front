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
    <div className="bg-white rounded-xl shadow p-4 mt-2">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-black">{title}</h3>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className=" bg-blue-600
                    text-white
                    px-3
                    py-0.5
                    rounded
                    cursor-pointer
                    hover:bg-blue-800
                    active:scale-95
                    transition
                    duration-150"
          >
            Edit
          </button>
        )}
      </div>

      {/* TABLE */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="text-left p-2 bg-gray-200 text-[#0d2b5c]"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="">
              {columns.map((column) => (
                <td key={String(column.key)} className="p-1">
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
