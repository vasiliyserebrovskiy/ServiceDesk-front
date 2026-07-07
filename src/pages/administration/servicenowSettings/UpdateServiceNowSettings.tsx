import { useServiceNowSettings } from "../../../shared/hooks/useServiceNowSettings";
import { useNavigate } from "react-router-dom";
import type { UpdateServiceNowSettings } from "../../../shared/types/servicenowTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import FormEditField from "../../../components/form/FormEditField";
import { updateServiceNowSettingsValidation } from "../../../shared/validation/updateServiceNowSettingsValidation";

export default function UpdateServiceNowSettings() {
  const { settings, updateServiceNowSettings } = useServiceNowSettings();
  const navigate = useNavigate();

  const initialValues: UpdateServiceNowSettings = {
    endpoint: settings.endpoint || "",
    username: settings.username || "",
    password: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    const payload = {
      endpoint: values.endpoint,
      username: values.username,
      password: values.password,
    };

    try {
      await updateServiceNowSettings(payload);
      resetForm();
      navigate("/admin/servicenowsettings");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-1">
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c]  text-lg font-bold">
            Edit ServiceNow Integration Settings
          </h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/admin/servicenowsettings")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SAVE */}
            <button
              type="submit"
              form="settings-update"
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
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={updateServiceNowSettingsValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form id="settings-update" className="grid grid-cols-1 gap-4 mt-5">
              {/* endpoint */}
              <FormEditField label="Endpoint" name="endpoint" />

              {/* username */}
              <FormEditField label="User Name" name="username" />

              {/* password */}
              <FormEditField label="Password" name="password" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
