import { useEffect, useState } from "react";
import { useUsers } from "../../../shared/hooks/useUsers";
import { useCategories } from "../../../shared/hooks/useCategories";
import { useSubcategories } from "../../../shared/hooks/useSubcategories";
import { useStatuses } from "../../../shared/hooks/useStatuses";
import { useGroups } from "../../../shared/hooks/useGroups";
import { useCIs } from "../../../shared/hooks/useCIs";
import { useNavigate } from "react-router-dom";
import { IncidentCreateValidation } from "../../../shared/validation/incidentCreateValidation";
import { Formik, Form, type FormikHelpers } from "formik";
import {
  type IncidentCreateFormValues,
  impactOptions,
  urgencyOptions,
  calculatePriority,
  priorityLabels,
} from "../../../shared/types/incidentTypes";
import { useIncidents } from "../../../shared/hooks/useIncidents";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";
import FormReadOnlyField from "../../../components/form/FormReadOnlyField";
import FormListField from "../../../components/form/FormListField";
import { fetchNextIncidentNumber } from "../../../features/incidents/incidentApi";

export default function CreateIncidentPage() {
  const { createIncident } = useIncidents();
  const { users, loadUsers } = useUsers();
  const { categories, loadCategories } = useCategories();
  const { subcategories, loadSubcategories } = useSubcategories();
  const { statuses, loadStatuses } = useStatuses();
  const { groups, loadGroups } = useGroups();
  const { cis, loadCIs } = useCIs();
  const [incidentNumber, setIncidentNumber] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if we need to load some data from dependency items
  useEffect(() => {
    const loadDependencies = async () => {
      await Promise.all(
        [
          !users.length && loadUsers(),
          !categories.length && loadCategories(),
          !subcategories.length && loadSubcategories(),
          !statuses.length && loadStatuses(),
          !groups.length && loadGroups(),
          !cis.length && loadCIs(),
        ].filter(Boolean),
      );
    };

    loadDependencies();
  }, [
    users.length,
    categories.length,
    subcategories.length,
    statuses.length,
    groups.length,
    cis.length,
    loadUsers,
    loadCategories,
    loadSubcategories,
    loadStatuses,
    loadGroups,
    loadCIs,
  ]);

  //Load incident number
  useEffect(() => {
    const loadNumber = async () => {
      const response = await fetchNextIncidentNumber();
      setIncidentNumber(response.number);
    };
    loadNumber();
  }, []);

  const dependenciesLoaded =
    users.length > 0 &&
    categories.length > 0 &&
    subcategories.length > 0 &&
    statuses.length > 0 &&
    groups.length > 0 &&
    cis.length;

  if (!dependenciesLoaded) {
    return <div>Loading...</div>;
  }

  const initialValues: IncidentCreateFormValues = {
    number: "",
    requesterId: "",
    categoryId: "",
    subcategoryId: "",
    statusId: "",
    priority: "LOW",
    impact: "LOW",
    urgency: "LOW",
    ciId: "",
    groupId: "",
    assigneeId: "",
    shortDescription: "",
    description: "",
  };

  if (!incidentNumber) return;

  const handleSubmit = async (
    values: IncidentCreateFormValues,
    { resetForm }: FormikHelpers<IncidentCreateFormValues>,
  ) => {
    const payload = {
      number: incidentNumber,
      requesterId: values.requesterId,
      categoryId: values.categoryId,
      subcategoryId: values.subcategoryId,
      statusId: values.statusId,
      priority: values.priority,
      impact: values.impact,
      urgency: values.urgency,
      ciId: values.ciId,
      groupId: values.groupId,
      assigneeId: values.assigneeId,
      shortDescription: values.shortDescription,
      description: values.description,
    };
    try {
      console.log(payload);
      await createIncident(payload);
      resetForm();
      navigate("/incidents/all");
    } catch (error) {
      console.log(error);
    }
  };
  // OPTIONS VALUES FOR LISTS
  const statusOptions = [
    { value: "", label: "" },
    ...(statuses?.map((status) => ({
      value: status.id,
      label: status.name,
    })) || []),
  ];

  const requesterOptions = [
    { value: "", label: "" },
    ...(users?.map((user) => ({
      value: user.id,
      label: user.firstname + " " + user.lastname,
    })) || []),
  ];

  const categoryOptions = [
    { value: "", label: "" },
    ...(categories?.map((c) => ({
      value: c.id,
      label: c.name,
    })) || []),
  ];

  const cisOptions = [
    { value: "", label: "" },
    ...(cis?.map((ci) => ({
      value: ci.id,
      label: ci.name,
    })) || []),
  ];

  const groupOptions = [
    { value: "", label: "-- None --" },
    ...(groups?.map((g) => ({
      value: g.id,
      label: g.name,
    })) || []),
  ];

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-1">
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c] text-lg font-bold">Create Incident</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/incidents/all")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              form="incident-form"
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Create
            </button>
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={IncidentCreateValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {
            const subcategoryOptions = [
              { value: "", label: "-- None --" },
              ...(subcategories
                ?.filter((s) => s.categoryId === values.categoryId)
                .map((s) => ({
                  value: s.id,
                  label: s.name,
                })) || []),
            ];

            const assigneeOptions = [
              { value: "", label: "-- None --" },
              ...(users
                ?.filter((u) => {
                  if (!values.groupId) return true;
                  const group = groups.find((g) => g.id === values.groupId);
                  return group?.userIds?.includes(u.id);
                })
                .map((u) => ({
                  value: u.id,
                  label: u.firstname + " " + u.lastname,
                })) || []),
            ];

            return (
              <Form id="incident-form" className="grid grid-cols-2 gap-4 mt-5">
                {/* INCIDENT NUMBER */}
                <FormReadOnlyField
                  label="Incident Number"
                  value={incidentNumber}
                />

                {/* STATUS */}
                <FormListField
                  label="Status"
                  name="statusId"
                  options={statusOptions}
                  required={true}
                />

                {/* REQUESTER */}
                <FormListField
                  label="Requester"
                  name="requesterId"
                  options={requesterOptions}
                  required={true}
                />

                {/* IMPACT */}
                <FormListField
                  label="Impact"
                  name="impact"
                  options={impactOptions}
                  onChange={(e) => {
                    setFieldValue("impact", e.target.value);
                    setFieldValue(
                      "priority",
                      calculatePriority(e.target.value, values.urgency),
                    );
                  }}
                />

                {/* CATEGORY */}
                <FormListField
                  label="Category"
                  name="categoryId"
                  options={categoryOptions}
                  required={true}
                  onChange={(e) => {
                    setFieldValue("categoryId", e.target.value);
                    setFieldValue("subcategoryId", "");
                  }}
                />

                {/* URGENCY */}
                <FormListField
                  label="Urgency"
                  name="urgency"
                  options={urgencyOptions}
                  onChange={(e) => {
                    setFieldValue("urgency", e.target.value);
                    setFieldValue(
                      "priority",
                      calculatePriority(values.impact, e.target.value),
                    );
                  }}
                />

                {/* SUBCATEGORY */}
                <FormListField
                  label="Subcategory"
                  name="subcategoryId"
                  options={subcategoryOptions}
                />

                {/* PRIORITY */}
                <FormReadOnlyField
                  label="Priority"
                  value={priorityLabels[values.priority] ?? values.priority}
                />

                {/* CI */}
                <FormListField
                  label="Configuration Item"
                  name="ciId"
                  options={cisOptions}
                  required={true}
                />

                {/* GROUP */}
                <FormListField
                  label="Group"
                  name="groupId"
                  options={groupOptions}
                  onChange={(e) => {
                    setFieldValue("groupId", e.target.value);
                    setFieldValue("assigneeId", "");
                  }}
                />

                {/* blank block */}
                <div></div>

                {/* ASSIGNEE */}
                <FormListField
                  label="Assignee"
                  name="assigneeId"
                  options={assigneeOptions}
                />

                {/* SHORT DESCRIPTION */}
                <FormEditField
                  label="Short Description"
                  name="shortDescription"
                  divClassName="col-span-2 flex flex-col text-black"
                  required={true}
                />

                {/* DESCRIPTION */}
                <FormDescField label="Description" name="description" />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
