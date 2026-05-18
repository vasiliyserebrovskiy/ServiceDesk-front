import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import type { FormikHelpers } from "formik";

import PasswordField from "../../components/form/PasswordField";
import { useUsers } from "../../shared/hooks/useUsers";

import type { UserFormValues } from "../../shared/types/usersTypes";

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
            <Form className="grid grid-cols-2 gap-4">
              {/* FIRSTNAME */}
              <div className="flex flex-col text-black">
                <label>Firstname</label>
                <Field name="firstname" className="border p-2 rounded" />
                {touched.firstname && errors.firstname && (
                  <span className="text-red-500 text-sm">
                    {errors.firstname}
                  </span>
                )}
              </div>

              {/* LASTNAME */}
              <div className="flex flex-col text-black">
                <label>Lastname</label>
                <Field name="lastname" className="border p-2 rounded" />
                {touched.lastname && errors.lastname && (
                  <span className="text-red-500 text-sm">
                    {errors.lastname}
                  </span>
                )}
              </div>

              {/* EMAIL */}
              <div className="flex flex-col text-black">
                <label>Email</label>
                <Field name="email" className="border p-2 rounded" />
                {touched.lastname && errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* ROLE */}
              <div className="flex flex-col text-black">
                <label>Role</label>
                <Field as="select" name="role" className="border p-2 rounded">
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Field>
                {touched.role && errors.role && (
                  <span className="text-red-500 text-sm">{errors.role}</span>
                )}
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col">
                <PasswordField
                  value={values.password}
                  onChange={(val) => setFieldValue("password", val)}
                  onBlur={() => setFieldTouched("password", true)}
                  labelClassName="text-black"
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
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="col-span-2 flex flex-col text-black">
                <label>Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="border p-2 rounded"
                />
              </div>

              {/* AVATAR */}
              <div className="col-span-2 flex flex-col text-black">
                <label>Avatar URL</label>
                <Field name="avatarUrl" className="border p-2 rounded" />
              </div>

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
