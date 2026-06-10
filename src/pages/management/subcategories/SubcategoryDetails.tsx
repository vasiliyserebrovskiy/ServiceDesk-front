import { useNavigate, useParams } from "react-router-dom";
import { useSubcategories } from "../../../shared/hooks/useSubcategories";
import type {
  Subcategory,
  SubcategoryFormValues,
} from "../../../shared/types/sybcategoryTypes";
import { useCategories } from "../../../shared/hooks/useCategories";
import { useEffect, useState } from "react";
import { Form, Formik, type FormikHelpers } from "formik";
import ConfirmDialog from "../../../components/modals/ConfirmDialog";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";
import FormListField from "../../../components/form/FormListField";
import { SubcategoryValidation } from "../../../shared/validation/subcategoryValidation";

export default function SubcategoryDetails() {
  const { id } = useParams();
  const {
    subcategories,
    getSubcategoryById,
    updateSubcategoryById,
    deleteSubcategoryById,
  } = useSubcategories();
  const navigate = useNavigate();
  const { categories, loadCategories } = useCategories();
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * Load subcategories if needed
   */
  useEffect(() => {
    if (!id) return;

    const subcategoryFromStore = subcategories.find((s) => s.id === id);
    let cancelled = false;
    const load = async () => {
      try {
        if (subcategoryFromStore) {
          setSubcategory(subcategoryFromStore);
          return;
        }

        const data = await getSubcategoryById(id);

        if (!cancelled) {
          setSubcategory(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, subcategories, getSubcategoryById]);

  useEffect(() => {
    if (!categories.length) {
      loadCategories();
    }
  }, [categories.length, loadCategories]);

  // invalid id
  if (!id) {
    return <div>Incalid subcategory id</div>;
  }

  // Loadin
  if (!subcategory || !categories.length) {
    return <div>Loadin...</div>;
  }

  // Variable for category
  const categoryOption =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  /**
   * FORMIK INITIAL VALUES
   */
  const initialValues: SubcategoryFormValues = {
    name: subcategory.name,
    description: subcategory.description,
    categoryId: subcategory.categoryId,
  };

  /**
   * Submit
   */
  const handleSubmit = async (
    values: SubcategoryFormValues,
    { resetForm }: FormikHelpers<SubcategoryFormValues>,
  ) => {
    const payload = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
    };

    try {
      await updateSubcategoryById(id, payload);
      resetForm();
      navigate("/subcategories/all");
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for delete dialog
  const handleDelete = () => {
    deleteSubcategoryById(id);
    navigate("/subcategories/all");
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-1">
        {/* TITLE */}
        <div className="flex bg-gray-200 p-2 items-center justify-between">
          <h2 className="text-[#0d2b5c]  text-lg font-bold">
            Edit Sybcategory
          </h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/subcategories/all")}
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
              form="subcategory-form"
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
          validationSchema={SubcategoryValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form id="subcategory-form" className="flex flex-col gap-4 mt-5">
              {/* SUBCATEGORY NAME */}
              <FormEditField label="Subcategory Name" name="name" />

              {/* DESCRIPTION */}
              <FormDescField label="Description" name="description" />

              {/* CATEGORY LIST */}
              <FormListField
                label="Category"
                name="categoryId"
                options={categoryOption}
              />
            </Form>
          )}
        </Formik>

        {/* Dialog for delete confirmation */}
        {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to delete this subcategory?"
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
