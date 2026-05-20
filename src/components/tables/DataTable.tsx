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
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow">
      {!data.length ? (
        <div className="flex items-center justify-center flex-1 p-8 text-gray-500">
          No data available
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="text-left px-4 py-3 text-sm font-semibold text-gray-700"
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="px-4 py-3 text-sm text-gray-800"
                    >
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// export function DataTable<T>({ data, columns }: DataTableProps<T>) {
//   return (
//     <div className="flex flex-col h-full w-full bg-white rounded-xl shadow">
//       <div className="overflow-auto">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               {columns.map((col, idx) => (
//                 <th
//                   key={idx}
//                   className="text-left px-4 py-3 text-sm font-semibold text-gray-700"
//                 >
//                   {col.title}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((item, rowIdx) => (
//               <tr
//                 key={rowIdx}
//                 className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
//               >
//                 {columns.map((col, colIdx) => (
//                   <td key={colIdx} className="px-4 py-3 text-sm text-gray-800">
//                     {col.render(item)}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
