import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useRoles } from "../../shared/hooks/useRoles";
import { getRoleDisplayName } from "../../shared/utils/getRoleDisplayName";

export default function ProfileEditPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { roles, isLoading } = useRoles();
  const navigate = useNavigate();

  const roleDisplayName = getRoleDisplayName(user?.roleId, roles ?? []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(user);
  console.log(roleDisplayName);

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-1">
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c]  text-lg font-bold">Edit Profile</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SAVE */}
            <button
              type="submit"
              form="me-update"
              className="
                    bg-blue-600
                    text-white
                    px-3
                    py-0.5
                    rounded
                    cursor-pointer
                    hover:bg-blue-800
                    active:scale-95
                    transition
                    duration-150
                  "
            >
              Save
            </button>
          </div>
        </div>
        {/* FORMIK */}
      </div>
    </div>
  );
}
