import { Form, Formik, type FormikHelpers } from "formik";
import { useCIs } from "../../../shared/hooks/useCIs";
import type { CIFormValues } from "../../../shared/types/cisTypes";
import { ciValidation } from "../../../shared/validation/ciValidation";
import FormDescField from "../../../components/form/FormDescField";
import FormEditField from "../../../components/form/FormEditField";
import { useNavigate } from "react-router-dom";

export default function CreateCIForm() {
  const { createCI } = useCIs();
  const navigate = useNavigate();

  const initialValues: CIFormValues = {
    name: "",
    description: "",
    type: "",
    manufacturer: "",
    serialNumber: "",
    model: "",
  };

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
      await createCI(payload);
      resetForm();
      navigate("/cis/all");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-1">
        {/* TITLE */}
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c] text-lg font-bold">
            Create Configuration Item
          </h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/cis/all")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              form="ci-form"
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
          validationSchema={ciValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form id="ci-form" className="flex flex-col gap-4 mt-5">
              {/* CI NAME */}
              <FormEditField label="Name" name="name" />

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
      </div>
    </div>
  );
}
