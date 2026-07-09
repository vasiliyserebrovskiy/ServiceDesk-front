import { useEffect, useState } from "react";
import { useCategories } from "../../../shared/hooks/useCategories";
import { useCIs } from "../../../shared/hooks/useCIs";
import { useGroups } from "../../../shared/hooks/useGroups";
import { useIncidents } from "../../../shared/hooks/useIncidents";
import { useStatuses } from "../../../shared/hooks/useStatuses";
import { useSubcategories } from "../../../shared/hooks/useSubcategories";
import { useUsers } from "../../../shared/hooks/useUsers";
import { useNavigate, useParams } from "react-router-dom";
import {
  calculatePriority,
  impactOptions,
  priorityLabels,
  urgencyOptions,
  type Incident,
  type IncidentUpdateFormValues,
} from "../../../shared/types/incidentTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import FormDescField from "../../../components/form/FormDescField";
import FormEditField from "../../../components/form/FormEditField";
import FormListField from "../../../components/form/FormListField";
import FormReadOnlyField from "../../../components/form/FormReadOnlyField";
import { IncidentUpdateValidation } from "../../../shared/validation/incidentUpdateValidation";
import {
  toNullableSelectOptions,
  toSelectOptions,
} from "../../../shared/utils/selectOptions";

export default function DetailsIncidentPage() {
  const { id } = useParams();
  const { incidents, getIncidentById, updateIncidentById } = useIncidents();
  const { users, loadUsers } = useUsers();
  const { categories, loadCategories } = useCategories();
  const { subcategories, loadSubcategories } = useSubcategories();
  const { statuses, loadStatuses } = useStatuses();
  const { groups, loadGroups } = useGroups();
  const { cis, loadCIs } = useCIs();
  const navigate = useNavigate();
  const [incident, setIncident] = useState<Incident | null>(null);

  //Load incident data if neaded
  useEffect(() => {
    if (!id) return;

    const incidentFromStore = incidents.find((i) => i.id === id);
    let cancelled = false;
    const load = async () => {
      try {
        if (incidentFromStore) {
          setIncident(incidentFromStore);
          return;
        }

        const data = await getIncidentById(id);

        if (!cancelled) {
          setIncident(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, incidents, getIncidentById]);

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

  if (!id) {
    return <div>Invalid incident id</div>;
  }

  if (!incident) {
    return <div>Loading incident...</div>;
  }

  const initialValues: IncidentUpdateFormValues = {
    requesterId: incident.requesterId ?? "",
    categoryId: incident.categoryId ?? "",
    subcategoryId: incident.subcategoryId ?? "",
    statusId: incident.statusId ?? "",
    priority: incident.priority ?? "",
    impact: incident.impact ?? "",
    urgency: incident.urgency ?? "",
    ciId: incident.ciId ?? "",
    groupId: incident.groupId ?? "",
    assigneeId: incident.assigneeId ?? "",
    shortDescription: incident.shortDescription ?? "",
    description: incident.description ?? "",
  };

  const handleSubmit = async (
    values: IncidentUpdateFormValues,
    { resetForm }: FormikHelpers<IncidentUpdateFormValues>,
  ) => {
    const payload = {
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
      await updateIncidentById(id, payload);
      resetForm();
      navigate("/incidents/open");
    } catch (error) {
      console.log(error);
    }
  };
  // OPTIONS VALUES FOR LISTS
  const statusOptions = toSelectOptions(statuses, (s) => s.name);
  const requesterOptions = toSelectOptions(
    users,
    (u) => `${u.firstname} ${u.lastname}`,
  );
  const categoryOptions = toSelectOptions(categories, (c) => c.name);
  const cisOptions = toNullableSelectOptions(cis, (ci) => ci.name);
  const groupOptions = toNullableSelectOptions(groups, (g) => g.name);

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-1">
        {/* TITLE */}
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c]  text-lg font-bold">Edit Incident</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/incidents/open")}
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
              form="incident-form"
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
        {/* FORM */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={IncidentUpdateValidation}
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
                  value={incident.number}
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

                {/* SERVICENOW SYNC STATUS */}
                <FormReadOnlyField
                  label="ServiceNow Sync"
                  value={incident.servicenowSynced ? "Synced" : "Not synced"}
                />

                {/* ASSIGNEE */}
                <FormListField
                  label="Assignee"
                  name="assigneeId"
                  options={assigneeOptions}
                />

                {incident.servicenowSynced && (
                  <>
                    {/* SERVICENOW NUMBER */}
                    <FormReadOnlyField
                      label="ServiceNow Number"
                      value={incident.servicenowNumber ?? "-"}
                    />

                    {/* SERVICENOW SYNCED AT */}
                    <FormReadOnlyField
                      label="Synced At"
                      value={
                        incident.servicenowSyncedAt
                          ? new Date(
                              incident.servicenowSyncedAt,
                            ).toLocaleString("de-DE", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                          : "-"
                      }
                    />
                  </>
                )}

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
