import { useNavigate, useParams } from "react-router-dom";
import { useCIs } from "../../../shared/hooks/useCIs";
import { useEffect, useState } from "react";
import type { CI, CIFormValues } from "../../../shared/types/cisTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import ConfirmDialog from "../../../components/modals/ConfirmDialog";
import { ciValidation } from "../../../shared/validation/ciValidation";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";

export default function CIDetails() {
  const { id } = useParams();
  const { cis, getCIById, updateCIById, deleteCIById } = useCIs();

  const navigate = useNavigate();
  const [ci, setCI] = useState<CI | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * LOAD CI
   */
  useEffect(() => {
    if (!id) return;

    const ciFromStore = cis.find((ci) => ci.id === id);

    let cancelled = false;

    const load = async () => {
      try {
        if (ciFromStore) {
          setCI(ciFromStore);
          return;
        }

        const data = await getCIById(id);

        if (!cancelled) {
          setCI(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, cis, getCIById]);

  /**
   * INVALID ID
   */
  if (!id) {
    return <div>Invalid CI id</div>;
  }

  /**
   * LOADING
   */
  if (!ci) {
    return <div>Loading ci...</div>;
  }

  /**
   * FORMIK INITIAL VALUES
   */
  const initialValues: CIFormValues = {
    name: ci.name,
    description: ci.description,
    type: ci.type,
    manufacturer: ci.manufacturer,
    serialNumber: ci.serialNumber,
    model: ci.model,
  };

  /**
   * SUBMIT
   */
  const handleSubmit = async (
    values: CIFormValues,
    { resetForm }: FormikHelpers<CIFormValues>,
  ) => {
    const payload = {
      name: values.name,
      description: values.description,
      type: values.type,
      manufacturer: values.manufacturer,
      serialNumber: values.serialNumber,
      model: values.model,
    };

    try {
      await updateCIById(id, payload);

      resetForm();

      navigate("/cis/all");
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for delete dialog
  const handleDelete = () => {
    deleteCIById(id);
    navigate("/cis/all");
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
              onClick={() => navigate("/cis/all")}
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
              form="ci-form"
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
          validationSchema={ciValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form id="ci-form" className="flex flex-col gap-4 mt-5">
              {/* CI NAME */}
              <FormEditField label="Group Name" name="name" />

              {/* CI TYPE */}
              <FormEditField label="Type" name="type" />

              {/* CI MANUFACTURER */}
              <FormEditField label="Manufacturer" name="manufacturer" />

              {/* CI SERIAL_NUMBER */}
              <FormEditField label="Serial Number" name="serialNumber" />

              {/* CI SERIAL_NUMBER */}
              <FormEditField label="Model" name="model" />

              {/* DESCRIPTION */}
              <FormDescField label="Description" name="description" />
            </Form>
          )}
        </Formik>

        {/* Dialog for delete confirmation */}
        {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to delete this Configuration Item?"
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
