import { useEffect, useState } from "react";
import { Form, Formik, type FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useGroups } from "../../../shared/hooks/useGroups";
import { useUsers } from "../../../shared/hooks/useUsers";
import type { Group, GroupFormValues } from "../../../shared/types/groupsTypes";
import type { User } from "../../../shared/types/usersTypes";
import { GroupValidation } from "../../../shared/validation/groupValidation";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";
import TableSection from "../../../components/tables/TableSection";
import UsersTransferModal from "../../../components/modals/UsersTransferModal";
import ConfirmDialog from "../../../components/modals/ConfirmDialog";

export default function GroupDetails() {
  const { id } = useParams();
  const { groups, getGroupById, updateGroupById, deleteGroupById } =
    useGroups();
  const { users, loadUsers, getUserById } = useUsers();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);
  const [groupUsers, setGroupUsers] = useState<User[]>([]);
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * LOAD GROUP
   */
  useEffect(() => {
    if (!id) return;

    const groupFromStore = groups.find((g) => g.id === id);

    let cancelled = false;

    const load = async () => {
      try {
        if (groupFromStore) {
          setGroup(groupFromStore);
          return;
        }

        const data = await getGroupById(id);

        if (!cancelled) {
          setGroup(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, groups, getGroupById]);

  /**
   * LOAD GROUP USERS
   */
  useEffect(() => {
    const loadUsers = async () => {
      if (!group) return;

      try {
        const users = await Promise.all(
          group.userIds.map((userId) => getUserById(userId)),
        );

        setGroupUsers(users);
      } catch (error) {
        console.log(error);
      }
    };

    loadUsers();
  }, [group, getUserById]);

  // Get users if needed
  useEffect(() => {
    if (!users.length) {
      loadUsers();
    }
  }, [users.length, loadUsers]);

  /**
   * INVALID ID
   */
  if (!id) {
    return <div>Invalid group id</div>;
  }

  /**
   * LOADING
   */
  if (!group) {
    return <div>Loading group...</div>;
  }

  /**
   * FORMIK INITIAL VALUES
   */
  const initialValues: GroupFormValues = {
    name: group.name,
    description: group.description,
    userIds: group.userIds || [],
  };

  /**
   * SUBMIT
   */
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
      await updateGroupById(id, payload);

      resetForm();

      navigate("/groups/all");
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for delete dialog
  const handleDelete = () => {
    deleteGroupById(id);
    navigate("/groups/all");
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-1">
        {/* TITLE */}
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c]  text-lg font-bold">Edit Group</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/groups/all")}
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
              Cancel
            </button>
            {/* UPDATE */}
            <button
              type="submit"
              form="group-form"
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
            {/* DELETE */}
            <button
              className=" bg-blue-600
                    text-white
                    px-3
                    py-0.5
                    rounded
                    cursor-pointer
                    hover:bg-blue-800
                    active:scale-95
                    transition
                    duration-150"
              onClick={() => setShowConfirm(true)}
            >
              Delete
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
                  {
                    key: "firstname",
                    title: "First Name",
                  },
                  {
                    key: "lastname",
                    title: "Last Name",
                  },
                  {
                    key: "email",
                    title: "Email",
                  },
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

        {/* Dialog for delete confirmation */}
        {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to delete this group?"
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
