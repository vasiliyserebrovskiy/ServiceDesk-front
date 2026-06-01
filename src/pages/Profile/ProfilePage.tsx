import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useRoles } from "../../shared/hooks/useRoles";
import { getRoleDisplayName } from "../../shared/utils/getRoleDisplayName";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const { roles, isLoading } = useRoles();
  const navigate = useNavigate();

  const roleDisplayName = getRoleDisplayName(user?.roleId, roles ?? []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-1">
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c]  text-lg font-bold">User Profile</h2>
          <div className="flex gap-2">
            {/* EDIT PROFILE */}
            <button
              onClick={() => navigate("/profile/edit")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Edit
            </button>
            {/* ChANGE PASSWORD */}
            <button
              onClick={() => navigate("/profile/change-password")}
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
              Change Password
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-5 justify-between text-black px-20">
            <p>User Name:</p>
            <p>{user?.firstname}</p>
          </div>

          <div className="flex gap-5 justify-between text-black px-20 mt-3">
            <p>Last Name:</p>
            <p>{user?.lastname}</p>
          </div>

          <div className="flex gap-5 justify-between text-black px-20 mt-3">
            <p>Email:</p>
            <p>{user?.email}</p>
          </div>

          <div className="flex gap-5 justify-between text-black px-20 mt-3">
            <p>Role:</p>
            <p>{roleDisplayName}</p>
          </div>

          <div className="flex flex-col gap-5 items-center text-black px-10 mt-5">
            <p>Description:</p>
            <p className="indent-6 text-justify leading-relaxed">
              {user?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
