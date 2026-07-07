import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceNowSettings } from "../../../shared/hooks/useServiceNowSettings";

export default function ServiceNowSettings() {
  const { settings, loading, loadServiceNowSettings } = useServiceNowSettings();
  const navigate = useNavigate();

  useEffect(() => {
    loadServiceNowSettings();
  }, [loadServiceNowSettings]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isConfigured = settings.endpoint !== null;

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-1">
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c]  text-lg font-bold">
            ServiceNow Integration Settings
          </h2>
          <div className="flex gap-2">
            {/* EDIT ServiceNow settings */}
            <button
              onClick={() => navigate("/admin/servicenowsettings/edit")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Edit
            </button>
          </div>
        </div>
        {/* тело формы */}
        {isConfigured ? (
          <div className="mt-5 px-6 grid grid-cols-[180px_1fr] gap-y-4 gap-x-4">
            <p className="text-gray-500">Endpoint:</p>
            <p className="text-black wrap-break-word">{settings.endpoint}</p>

            <p className="text-gray-500">User Name:</p>
            <p className="text-black">{settings.username}</p>

            <p className="text-gray-500">Password configured:</p>
            <p className="text-black">
              {settings.passwordConfigured ? "Yes" : "No"}
            </p>
          </div>
        ) : (
          <div className="flex gap-5 justify-center text-black px-20 mt-3">
            <p>ServiceNow integration is not configured yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
