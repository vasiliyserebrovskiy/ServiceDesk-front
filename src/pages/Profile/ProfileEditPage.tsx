import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useRoles } from "../../shared/hooks/useRoles";
import { getRoleDisplayName } from "../../shared/utils/getRoleDisplayName";

import { Form, Formik, type FormikHelpers } from "formik";
import FormEditField from "../../components/form/FormEditField";
import FormDescField from "../../components/form/FormDescField";
import { updateProfileValidation } from "../../shared/validation/updateProfileValidation";
import { useUsers } from "../../shared/hooks/useUsers";

export default function ProfileEditPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { roles, isLoading } = useRoles();
  const navigate = useNavigate();
  const { updateUser } = useUsers();

  const roleDisplayName = getRoleDisplayName(user?.roleId, roles ?? []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(user);
  console.log(roleDisplayName);

  // 2. loading state did not know if we realy need this
  if (!user || isLoading) {
    return <div>Loading user...</div>;
  }

  const initialValues = {
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    description: user.description || "",
    avatarUrl: user.avatarUrl || "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    const payload = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      roleId: user.roleId,
      description: values.description,
      avatarUrl: values.avatarUrl,
      isActive: user.isActive,
      isBlocked: user.isBlocked,
    };

    try {
      console.log("PAYLOAD: " + payload);
      await updateUser(user.id, payload);

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
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={updateProfileValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form id="me-update" className="grid grid-cols-2 gap-4 mt-5">
              {/* FIRSTNAME */}
              <FormEditField label="Firstname" name="firstname" />

              {/* LASTNAME */}
              <FormEditField label="Lastname" name="lastname" />

              {/* EMAIL */}
              <FormEditField label="Email" name="email" />

              {/* ROLE */}
              {/* <FormListField label="Role" name="role" options={roleOptions} /> */}
              <div className="flex flex-col text-black">
                <label>Role</label>
                <div className="border p-2 rounded bg-gray-100 text-gray-700">
                  {roleDisplayName}
                </div>
              </div>

              {/* DESCRIPTION */}
              <FormDescField label="Description" name="description" />

              {/* AVATAR */}
              <FormEditField
                label="Avatar URL"
                name="avatarUrl"
                divClassName="col-span-2 flex flex-col text-black"
              />

              {/* FLAGS */}
              {/* <div className="col-span-2 flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.isActive}
                    onChange={(e) =>
                      setFieldValue("isActive", e.target.checked)
                    }
                  />
                  Active
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.isBlocked}
                    onChange={(e) =>
                      setFieldValue("isBlocked", e.target.checked)
                    }
                  />
                  Blocked
                </label>
              </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
