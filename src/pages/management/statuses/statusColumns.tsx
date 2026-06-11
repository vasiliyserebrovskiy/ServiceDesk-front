import type { StatusList } from "../../../shared/types/statusTypes";

export const statusColumns = [
  {
    title: "Name",
    render: (status: StatusList) => status.name,
  },
  {
    title: "Description",
    render: (status: StatusList) => status.description,
  },
  {
    title: "Incident",
    render: (status: StatusList) => (status.isIncident ? "Yes" : "No"),
  },
  {
    title: "Problem",
    render: (status: StatusList) => (status.isProblem ? "Yes" : "No"),
  },
  {
    title: "Request",
    render: (status: StatusList) => (status.isRequest ? "Yes" : "No"),
  },
  {
    title: "Change",
    render: (status: StatusList) => (status.isChange ? "Yes" : "No"),
  },
  {
    title: "Task",
    render: (status: StatusList) => (status.isTask ? "Yes" : "No"),
  },
];
