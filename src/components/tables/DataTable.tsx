import React from "react";

export type Column<T> = {
  title: string;
  render: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} style={{ textAlign: "left", padding: 8 }}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item, rowIdx) => (
          <tr key={rowIdx}>
            {columns.map((col, colIdx) => (
              <td
                key={colIdx}
                style={{ padding: 8, borderTop: "1px solid #eee" }}
              >
                {col.render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
