import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import PasswordField from "../../../components/form/PasswordField";
import { useUsers } from "../../../shared/hooks/useUsers";
import type { UserFormValues } from "../../../shared/types/usersTypes";
import FormEditField from "../../../components/form/FormEditField";
import FormListField from "../../../components/form/FormListField";
import FormDescField from "../../../components/form/FormDescField";
import { useRoles } from "../../../shared/hooks/useRoles";
import { UserValidation } from "../../../shared/validation/userValidation";
import { useNavigate } from "react-router-dom";

export default function CreateUserForm() {
  const { createUser } = useUsers();
  const { roles, isLoading } = useRoles();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading roles...</div>;
  }

  const roleOptions =
    roles?.map((role) => ({
      value: role.name,
      label: role.displayName,
    })) || [];

  const initialValues: UserFormValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: roles?.[0]?.name || "",
    description: "",
    avatarUrl: "",
  };

  const handleSubmit = async (
    values: UserFormValues,
    { resetForm }: FormikHelpers<UserFormValues>,
  ) => {
    const payload = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      role: values.role,
      description: values.description,
      avatarUrl: values.avatarUrl,
    };
    try {
      await createUser(payload);
      resetForm();
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-1">
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c] text-lg font-bold">Create User</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/admin/users")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              form="user-form"
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Create
            </button>
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={UserValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
            <Form id="user-form" className="grid grid-cols-2 gap-4 mt-5">
              {/* FIRSTNAME */}
              <FormEditField label="Firstname" name="firstname" />

              {/* LASTNAME */}
              <FormEditField label="Lastname" name="lastname" />

              {/* EMAIL */}
              <FormEditField label="Email" name="email" />

              {/* ROLE */}
              <FormListField label="Role" name="role" options={roleOptions} />

              {/* PASSWORD */}
              <div className="flex flex-col">
                <PasswordField
                  value={values.password}
                  onChange={(val) => setFieldValue("password", val)}
                  onBlur={() => setFieldTouched("password", true)}
                  labelClassName="text-black"
                  inputClassName="border border-black p-2 rounded w-full pr-10 text-black"
                />
                {touched.password && errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
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

              {/* DESCRIPTION */}
              <FormDescField label="Description" name="description" />

              {/* AVATAR */}
              <FormEditField
                label="Avatar URL"
                name="avatarUrl"
                divClassName="col-span-2 flex flex-col text-black"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
