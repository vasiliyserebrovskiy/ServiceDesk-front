import { useUsers } from "../../shared/hooks/useUsers";
import { useNavigate } from "react-router-dom";
import type { ChangeUserPasswordForm } from "../../shared/types/usersTypes";
import { useAppSelector } from "../../app/hooks";
import { Form, Formik, type FormikHelpers } from "formik";
import { ChangePasswordValidation } from "../../shared/validation/changePasswordValidation";
import PasswordField from "../../components/form/PasswordField";

export default function ProfileChangePasswordPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { changePassword } = useUsers();
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading user...</div>;
  }

  const initialValues: ChangeUserPasswordForm = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: ChangeUserPasswordForm,
    { resetForm }: FormikHelpers<ChangeUserPasswordForm>,
  ) => {
    const payload = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      await changePassword(user.id, payload);
      resetForm();
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-1">
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c] text-lg font-bold">Change Password</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              form="change-password-form"
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Save
            </button>
          </div>
        </div>
        {/* FORM */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ChangePasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
            <Form
              id="change-password-form"
              className="grid grid-cols-2 gap-4 mt-5"
            >
              {/* OLD PASSWORD */}
              <div className="flex flex-col">
                <PasswordField
                  value={values.oldPassword}
                  onChange={(val) => setFieldValue("oldPassword", val)}
                  onBlur={() => setFieldTouched("oldPassword", true)}
                  label="Old Password"
                  placeholder="old password"
                  labelClassName="text-black"
                  inputClassName="border border-black p-2 rounded w-full pr-10 text-black"
                />
                {touched.oldPassword && errors.oldPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.oldPassword}
                  </span>
                )}
              </div>

              <div className="flex flex-col"></div>

              {/* NEW PASSWORD */}
              <div className="flex flex-col">
                <PasswordField
                  value={values.newPassword}
                  onChange={(val) => setFieldValue("newPassword", val)}
                  onBlur={() => setFieldTouched("newPassword", true)}
                  labelClassName="text-black"
                  inputClassName="border border-black p-2 rounded w-full pr-10 text-black"
                />
                {touched.newPassword && errors.newPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.newPassword}
                  </span>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col">
                <PasswordField
                  value={values.confirmPassword}
                  onChange={(val) => setFieldValue("confirmPassword", val)}
                  onBlur={() => setFieldTouched("confirmPassword", true)}
                  label="Confirm Password"
                  placeholder="confirm password"
                  labelClassName="text-black"
                  inputClassName="border border-black p-2 rounded w-full pr-10 text-black"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
