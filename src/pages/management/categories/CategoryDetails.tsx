import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../../shared/hooks/useCategories";
import { useEffect, useState } from "react";
import type {
  Category,
  CategoryFormValues,
} from "../../../shared/types/categoryTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import ConfirmDialog from "../../../components/modals/ConfirmDialog";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";
import { CategoryValidation } from "../../../shared/validation/categoryValidation";

export default function CategoryDetails() {
  const { id } = useParams();
  const {
    categories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
  } = useCategories();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * LOAD CATEGORY
   */
  useEffect(() => {
    if (!id) return;

    const categoryFromStore = categories.find((c) => c.id === id);
    let cancelled = false;
    const load = async () => {
      try {
        if (categoryFromStore) {
          setCategory(categoryFromStore);
          return;
        }

        const data = await getCategoryById(id);

        if (!cancelled) {
          setCategory(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, categories, getCategoryById]);

  /**
   * INVALID ID
   */
  if (!id) {
    return <div>Invalid category id</div>;
  }

  /**
   * LOADING
   */
  if (!category) {
    return <div>Loading category...</div>;
  }

  /**
   * FORMIK INITIAL VALUES
   */
  const initialValues: CategoryFormValues = {
    name: category.name,
    description: category.description,
    isIncident: category.isIncident,
    isProblem: category.isProblem,
    isRequest: category.isRequest,
    isChange: category.isChange,
  };

  /**
   * SUBMIT
   */
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
      await updateCategoryById(id, payload);

      resetForm();

      navigate("/categories/all");
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for delete dialog
  const handleDelete = () => {
    deleteCategoryById(id);
    navigate("/categories/all");
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
              onClick={() => navigate("/categories/all")}
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
              form="category-form"
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
        {/* FORM */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={CategoryValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form id="category-form" className="flex flex-col gap-4 mt-5">
              {/* GROUP NAME */}
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

        {/* Dialog for delete confirmation */}
        {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to delete this category?"
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
