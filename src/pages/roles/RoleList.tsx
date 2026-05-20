import { useRoles } from "../../shared/hooks/useRoles";
import { DataTable } from "../../components/tables/DataTable";
import { roleColumns } from "../roles/roleColumns";

export const RolesList = () => {
  const { roles, isLoading } = useRoles();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading roles...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <h2 className="text-gray-500">Roles List</h2>

      <DataTable data={roles} columns={roleColumns} />
    </div>
  );
};
// import { useRoles } from "../../shared/hooks/useRoles";

// export const RolesList = () => {
//   const { roles, isLoading } = useRoles();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading roles...</p>
//       </div>
//     );
//   }

//   if (!roles || roles.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>No roles found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex justify-center bg-gray-50 p-6">
//       <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl px-8 py-8">
//         {/* Title */}
//         <h1 className="text-gray-500 text-2xl font-bold text-center mb-6">
//           Roles List
//         </h1>

//         {/* Header row */}
//         <div className="grid grid-cols-3 font-semibold border-b pb-3 mb-3 text-gray-600">
//           <p>Name</p>
//           <p>Description</p>
//           <p className="text-center">Default</p>
//         </div>

//         {/* Rows */}
//         <div className="flex flex-col gap-3">
//           {roles.map((role) => (
//             <div
//               key={role.id}
//               className="grid grid-cols-3 items-center bg-gray-50 px-3 py-2 rounded-md"
//             >
//               <p className="font-medium">{role.name}</p>

//               <p className="text-gray-600">{role.description}</p>

//               <p className="text-center">{role.defaultRole ? "Yes" : "No"}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
