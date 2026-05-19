import { Formik, Form } from "formik";
import * as Yup from "yup";
import type { FormikHelpers } from "formik";

import PasswordField from "../../components/form/PasswordField";
import { useUsers } from "../../shared/hooks/useUsers";

import type { UserFormValues } from "../../shared/types/usersTypes";
import FormEditField from "../../components/form/FormEditField";
import FormListField from "../../components/form/FormListField";
import FormDescField from "../../components/form/FormDescField";

const validationSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  role: Yup.string().required("Required"),
  description: Yup.string(),
  avatarUrl: Yup.string(),
});

export default function CreateNewUserForm() {
  const { createUser } = useUsers();
  //TODO: this is temporary, will replase with useRole
  const roles = [
    { value: "USER", label: "User" },
    { value: "MANAGER", label: "Manager" },
    { value: "ADMIN", label: "Admin" },
  ];

  const initialValues: UserFormValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
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

    await createUser(payload);

    resetForm();
  };

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-gray-500 text-center">Create New User</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
            <Form className="grid grid-cols-2 gap-4">
              {/* FIRSTNAME */}
              <FormEditField label="Firstname" name="firstname" />

              {/* LASTNAME */}
              <FormEditField label="Lastname" name="lastname" />

              {/* EMAIL */}
              <FormEditField label="Email" name="email" />

              {/* ROLE */}
              <FormListField label="Role" name="role" options={roles} />

              {/* PASSWORD */}
              <div className="flex flex-col">
                <PasswordField
                  value={values.password}
                  onChange={(val) => setFieldValue("password", val)}
                  onBlur={() => setFieldTouched("password", true)}
                  labelClassName="text-black"
                  inputClassName="border border-black p-2 rounded w-full pr-10"
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
                  inputClassName="border border-black p-2 rounded w-full pr-10"
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

              {/* SUBMIT */}
              <div className="col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Create user
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
