import React from "react";
import { Link } from "react-router-dom";

export type Column<T> = {
  title: string;
  render: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];

  columns: Column<T>[];

  /**
   * Unique row key
   */
  getRowId: (item: T) => string | number;

  /**
   * Optional details page link
   */
  getDetailsLink?: (item: T) => string;
};

export function DataTable<T>({
  data,
  columns,
  getRowId,
  getDetailsLink,
}: DataTableProps<T>) {
  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow overflow-hidden">
      {!data.length ? (
        <div className="flex items-center justify-center flex-1 p-8 text-gray-500">
          No data available
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-300">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="text-left px-3 py-2 text-sm font-semibold text-gray-700"
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={getRowId(item)}
                  className="border-t border-gray-200 hover:bg-blue-100 transition-colors"
                >
                  {columns.map((col, colIdx) => {
                    const content = col.render(item);

                    return (
                      <td
                        key={colIdx}
                        className="px-3 py-1 text-sm text-gray-800"
                      >
                        {colIdx === 0 && getDetailsLink ? (
                          <Link
                            to={getDetailsLink(item)}
                            className="block hover:bg-blue-200 rounded px-1 py-1 text-blue-900"
                          >
                            {content}
                          </Link>
                        ) : (
                          content
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
