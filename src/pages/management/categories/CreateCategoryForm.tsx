import { useCategories } from "../../../shared/hooks/useCategories";
import { useNavigate } from "react-router-dom";
import type { CategoryFormValues } from "../../../shared/types/categoryTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";
import { CategoryValidation } from "../../../shared/validation/categoryValidation";

export default function CreateGroupForm() {
  const { createCategory } = useCategories();
  const navigate = useNavigate();

  const initialValues: CategoryFormValues = {
    name: "",
    description: "",
    isIncident: false,
    isProblem: false,
    isRequest: false,
    isChange: false,
  };

  const handleSubmit = async (
    values: CategoryFormValues,
    { resetForm }: FormikHelpers<CategoryFormValues>,
  ) => {
    const payload = {
      name: values.name,
      description: values.description,
      isIncident: values.isIncident,
      isProblem: values.isProblem,
      isRequest: values.isRequest,
      isChange: values.isChange,
    };
    try {
      await createCategory(payload);
      resetForm();
      navigate("/categories/all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-1">
        {/* TITLE */}
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c] text-lg font-bold">Create Category</h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/categories/all")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              form="category-form"
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
          validationSchema={CategoryValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form id="category-form" className="flex flex-col gap-4 mt-5">
              {/* CATEGORY NAME */}
              <FormEditField label="Category Name" name="name" />

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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
