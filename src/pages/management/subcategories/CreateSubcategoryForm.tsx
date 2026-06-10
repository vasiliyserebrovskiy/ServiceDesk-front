import { useNavigate } from "react-router-dom";
import { useSubcategories } from "../../../shared/hooks/useSubcategories";
import type { SubcategoryFormValues } from "../../../shared/types/sybcategoryTypes";
import { Form, Formik, type FormikHelpers } from "formik";
import { SubcategoryValidation } from "../../../shared/validation/subcategoryValidation";
import FormEditField from "../../../components/form/FormEditField";
import FormDescField from "../../../components/form/FormDescField";
import FormListField from "../../../components/form/FormListField";
import { useCategories } from "../../../shared/hooks/useCategories";
import { useEffect } from "react";

export default function CreateSubcategoryForm() {
  const { createSubcategory } = useSubcategories();
  const { categories, loadCategories, loading } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories.length) {
      loadCategories();
    }
  }, [categories.length, loadCategories]);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  const categoryOption =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const initialValues: SubcategoryFormValues = {
    name: "",
    description: "",
    categoryId: categories?.[0]?.id || "",
  };

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
      console.log(payload);
      await createSubcategory(payload);
      resetForm();
      navigate("/subcategories/all");
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
            Create Subcategory
          </h2>
          <div className="flex gap-2">
            {/* CANCEL */}
            <button
              onClick={() => navigate("/subcategories/all")}
              className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
            >
              Cancel
            </button>
            {/* SUBMIT */}
            <button
              type="submit"
              form="subcategory-form"
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
      </div>
    </div>
  );
}
