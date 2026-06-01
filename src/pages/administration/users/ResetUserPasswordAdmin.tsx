import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../../shared/hooks/useUsers";
import type { ResetUserPasswordForm } from "../../../shared/types/usersTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import { ResetPasswordValidation } from "../../../shared/validation/resetPasswordValidation";
import PasswordField from "../../../components/form/PasswordField";

export default function ResetUserPasswordAdmin() {
  const { id } = useParams();
  const { resetPassword } = useUsers();
  const navigate = useNavigate();

  if (!id) {
    return <div>Invalid user id</div>;
  }

  const initialValues: ResetUserPasswordForm = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: ResetUserPasswordForm,
    { resetForm }: FormikHelpers<ResetUserPasswordForm>,
  ) => {
    const payload = {
      newPassword: values.newPassword,
    };
    try {
      await resetPassword(id, payload);
      resetForm();
      navigate(`/admin/users/${id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-1">
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c] text-lg font-bold">Reset Password</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate(`/admin/users/${id}/`)}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              form="reset-password-form"
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
          validationSchema={ResetPasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
            <Form
              id="reset-password-form"
              className="grid grid-cols-2 gap-4 mt-5"
            >
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
