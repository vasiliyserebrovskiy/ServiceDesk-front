import { useEffect, useState } from "react";
import { useGroups } from "../../../shared/hooks/useGroups";
import { useUsers } from "../../../shared/hooks/useUsers";
import { useNavigate } from "react-router-dom";
import type { GroupFormValues } from "../../../shared/types/groupsTypes";
import type { User } from "../../../shared/types/usersTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import { GroupValidation } from "../../../shared/validation/groupValidation";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";
import TableSection from "../../../components/tables/TableSection";
import UsersTransferModal from "../../../components/modals/UsersTransferModal";

export default function CreateGroupForm() {
  const { createGroup } = useGroups();
  const { users, loadUsers } = useUsers();
  const navigate = useNavigate();
  const [groupUsers, setGroupUsers] = useState<User[]>([]);
  const [openUsersModal, setOpenUsersModal] = useState(false);

  // Load users if needed
  useEffect(() => {
    if (!users.length) {
      loadUsers();
    }
  }, [users.length, loadUsers]);

  const initialValues: GroupFormValues = {
    name: "",
    description: "",
    userIds: [],
  };

  const handleSubmit = async (
    values: GroupFormValues,
    { resetForm }: FormikHelpers<GroupFormValues>,
  ) => {
    const payload = {
      name: values.name,
      description: values.description,
      userIds: groupUsers.map((user) => user.id),
    };
    try {
      await createGroup(payload);
      resetForm();
      navigate("/groups/all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-1">
        {/* TITLE */}
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c] text-lg font-bold">Create Group</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/groups/all")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              form="group-form"
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Create
            </button>
          </div>
        </div>

        {/* FORM */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={GroupValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form id="group-form" className="flex flex-col gap-4 mt-5">
              {/* GROUP NAME */}
              <FormEditField label="Group Name" name="name" />

              {/* DESCRIPTION */}
              <FormDescField label="Description" name="description" />

              {/* USERS TABLE */}
              <TableSection
                title="Group Members"
                data={groupUsers}
                columns={[
                  { key: "firstname", title: "First Name" },
                  { key: "lastname", title: "Last Name" },
                  { key: "email", title: "Email" },
                ]}
                onEdit={() => setOpenUsersModal(true)}
              />
            </Form>
          )}
        </Formik>

        {/* USERS MODAL */}
        <UsersTransferModal
          key={openUsersModal ? "open" : "closed"}
          open={openUsersModal}
          allUsers={users}
          selectedUsers={groupUsers}
          onClose={() => setOpenUsersModal(false)}
          onSave={(users) => {
            setGroupUsers(users);
            setOpenUsersModal(false);
          }}
        />
      </div>
    </div>
  );
}
