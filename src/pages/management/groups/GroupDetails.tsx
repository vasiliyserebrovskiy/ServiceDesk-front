import { useGroups } from "../../../shared/hooks/useGroups";
import { useNavigate, useParams } from "react-router-dom";
import type { Group, GroupFormValues } from "../../../shared/types/groupsTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import { GroupValidation } from "../../../shared/validation/groupValidation";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";
import { useEffect, useState } from "react";

export default function GroupDetails() {
  const { id } = useParams();
  const { groups, getGroupById, updateGroupById } = useGroups();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);

  // 1. try get from store
  useEffect(() => {
    if (!id) return;

    const groupFromStore = groups.find((g) => g.id === id);

    let cancelled = false;

    const load = async () => {
      if (groupFromStore) {
        setGroup(groupFromStore);
        return;
      }
      const data = await getGroupById(id);

      if (!cancelled) {
        setGroup(data);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, groups, getGroupById]);

  if (!id) {
    return <div>Invalid group id</div>;
  }

  // 2. loading state
  if (!group) {
    return <div>Loading group...</div>;
  }

  const initialValues: GroupFormValues = {
    name: group.name,
    description: group.description,
    userIds: [],
  };

  //TODO: user ids must not be null
  const handleSubmit = async (
    values: GroupFormValues,
    { resetForm }: FormikHelpers<GroupFormValues>,
  ) => {
    const payload = {
      name: values.name,
      description: values.description,
      userIds: [],
    };
    try {
      await updateGroupById(id, payload);
      resetForm();
      navigate("/groups/all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-gray-500 text-center">Create New Group</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={GroupValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-4">
              {/* GROUP NAME */}
              <FormEditField label="Group Name" name="name" />

              {/* DESCRIPTION */}
              <FormDescField label="Description" name="description" />

              {/* SUBMIT */}
              <div className="col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded
             cursor-pointer
             hover:bg-blue-700
             active:scale-95
             transition duration-150"
                >
                  Update group
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
