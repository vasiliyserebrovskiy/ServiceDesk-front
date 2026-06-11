import { useNavigate, useParams } from "react-router-dom";
import { useStatuses } from "../../../shared/hooks/useStatuses";
import type {
  Status,
  StatusFormValues,
} from "../../../shared/types/statusTypes";
import { useEffect, useState } from "react";
import { Form, Formik, type FormikHelpers } from "formik";
import ConfirmDialog from "../../../components/modals/ConfirmDialog";
import FormDescField from "../../../components/form/FormDescField";
import FormEditField from "../../../components/form/FormEditField";
import { StatusValidation } from "../../../shared/validation/statusValidation";

export default function StatusDetails() {
  const { id } = useParams();
  const { statuses, getStatusById, updateStatusById, deleteStatusById } =
    useStatuses();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * LOAD STATUS
   */
  useEffect(() => {
    if (!id) return;

    const statusFromStore = statuses.find((s) => s.id === id);
    let cancelled = false;
    const load = async () => {
      try {
        if (statusFromStore) {
          setStatus(statusFromStore);
          return;
        }

        const data = await getStatusById(id);

        if (!cancelled) {
          setStatus(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, statuses, getStatusById]);

  /**
   * INVALID ID
   */
  if (!id) {
    return <div>Invalid status id</div>;
  }

  /**
   * LOADING
   */
  if (!status) {
    return <div>Loading status...</div>;
  }

  /**
   * FORMIK INITIAL VALUES
   */
  const initialValues: StatusFormValues = {
    name: status.name,
    description: status.description,
    isIncident: status.isIncident,
    isProblem: status.isProblem,
    isRequest: status.isRequest,
    isChange: status.isChange,
    isTask: status.isTask,
  };

  /**
   * SUBMIT
   */
  const handleSubmit = async (
    values: StatusFormValues,
    { resetForm }: FormikHelpers<StatusFormValues>,
  ) => {
    const payload = {
      name: values.name,
      description: values.description,
      isIncident: values.isIncident,
      isProblem: values.isProblem,
      isRequest: values.isRequest,
      isChange: values.isChange,
      isTask: values.isTask,
    };

    try {
      await updateStatusById(id, payload);

      resetForm();

      navigate("/statuses/all");
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for delete dialog
  const handleDelete = () => {
    deleteStatusById(id);
    navigate("/statuses/all");
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-1">
        {/* TITLE */}
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c]  text-lg font-bold">Edit Status</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/statuses/all")}
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
              form="status-form"
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
          validationSchema={StatusValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form id="status-form" className="flex flex-col gap-4 mt-5">
              {/* STATUS NAME */}
              <FormEditField label="Status Name" name="name" />

              {/* DESCRIPTION */}
              <FormDescField label="Description" name="description" />

              {/* TICKETS FLAGS */}
              <div className="col-span-2 flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.isIncident}
                    onChange={(e) =>
                      setFieldValue("isIncident", e.target.checked)
                    }
                  />
                  Incident
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.isProblem}
                    onChange={(e) =>
                      setFieldValue("isProblem", e.target.checked)
                    }
                  />
                  Problem
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.isRequest}
                    onChange={(e) =>
                      setFieldValue("isRequest", e.target.checked)
                    }
                  />
                  Request
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.isChange}
                    onChange={(e) =>
                      setFieldValue("isChange", e.target.checked)
                    }
                  />
                  Change
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.isTask}
                    onChange={(e) => setFieldValue("isTask", e.target.checked)}
                  />
                  Task
                </label>
              </div>
            </Form>
          )}
        </Formik>

        {/* Dialog for delete confirmation */}
        {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to delete this status?"
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
