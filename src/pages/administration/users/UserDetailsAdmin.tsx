import { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../../shared/hooks/useUsers";
import { useRoles } from "../../../shared/hooks/useRoles";
import FormEditField from "../../../components/form/FormEditField";
import FormListField from "../../../components/form/FormListField";
import FormDescField from "../../../components/form/FormDescField";
import type { User } from "../../../shared/types/usersTypes";
import { updateUserValidation } from "../../../shared/validation/updateUserValidation";

export default function UserDetailsAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, getUserById, updateUser } = useUsers();
  const { roles, isLoading } = useRoles();
  const [user, setUser] = useState<User | null>(null);

  // roles options
  const roleOptions = useMemo(() => {
    return (
      roles?.map((role) => ({
        value: role.id,
        label: role.displayName,
      })) || []
    );
  }, [roles]);

  // 1. try get from store
  useEffect(() => {
    if (!id) return;

    const userFromStore = users.find((u) => u.id === id);

    let cancelled = false;

    const load = async () => {
      if (userFromStore) {
        setUser(userFromStore);
        return;
      }

      const data = await getUserById(id);

      if (!cancelled) {
        setUser(data);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, users, getUserById]);

  if (!id) {
    return <div>Invalid user id</div>;
  }

  // 2. loading state
  if (!user || isLoading) {
    return <div>Loading user...</div>;
  }

  const initialValues = {
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    role: user.roleId || "",
    description: user.description || "",
    avatarUrl: user.avatarUrl || "",
    isActive: user.isActive ?? true,
    isBlocked: user.isBlocked ?? false,
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    const payload = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      roleId: values.role,
      description: values.description,
      avatarUrl: values.avatarUrl,
      isActive: values.isActive,
      isBlocked: values.isBlocked,
    };

    try {
      await updateUser(id, payload);

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
          <h2 className="text-[#0d2b5c]  text-lg font-bold">Edit User</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/admin/users")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* CANCEL */}
            <button
              onClick={() => navigate(`/admin/users/${id}/reset-password`)}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Reset Password
            </button>
            {/* UPDATE */}
            <button
              type="submit"
              form="user-form"
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
              Update
            </button>
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={updateUserValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form id="user-form" className="grid grid-cols-2 gap-4 mt-5">
              {/* FIRSTNAME */}
              <FormEditField label="Firstname" name="firstname" />

              {/* LASTNAME */}
              <FormEditField label="Lastname" name="lastname" />

              {/* EMAIL */}
              <FormEditField label="Email" name="email" />

              {/* ROLE */}
              <FormListField label="Role" name="role" options={roleOptions} />

              {/* DESCRIPTION */}
              <FormDescField label="Description" name="description" />

              {/* AVATAR */}
              <FormEditField
                label="Avatar URL"
                name="avatarUrl"
                divClassName="col-span-2 flex flex-col text-black"
              />

              {/* FLAGS */}
              <div className="col-span-2 flex gap-6 mt-2">
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
