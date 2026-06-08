import type { CategoryList } from "../../../shared/types/categoryTypes";

export const categoriesColumns = [
  {
    title: "Name",
    render: (category: CategoryList) => category.name,
  },
  {
    title: "Description",
    render: (category: CategoryList) => category.description,
  },
  {
    title: "Incident",
    render: (category: CategoryList) => (category.isIncident ? "Yes" : "No"),
  },
  {
    title: "Problem",
    render: (category: CategoryList) => (category.isProblem ? "Yes" : "No"),
  },
  {
    title: "Request",
    render: (category: CategoryList) => (category.isRequest ? "Yes" : "No"),
  },
  {
    title: "Change",
    render: (category: CategoryList) => (category.isChange ? "Yes" : "No"),
  },
];
