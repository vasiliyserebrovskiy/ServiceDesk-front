import { useAppSelector } from "../../app/hooks";
import { formatRole } from "../../shared/utils/roleFormatter";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl px-8 py-8">
        <h1 className="text-gray-500 text-2xl sm:text-3xl font-bold mb-4 whitespace-nowrap text-center">
          User Profile
        </h1>
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
          <p>{formatRole(user?.role)}</p>
        </div>

        <div className="flex flex-col gap-5 items-center text-black px-10 mt-5">
          <p>Description:</p>
          <p className="indent-6 text-justify leading-relaxed">
            {user?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
