import type { CIList } from "../../../shared/types/cisTypes";

export const CIColumns = [
  {
    title: "Name",
    render: (CI: CIList) => CI.name,
  },
  {
    title: "Type",
    render: (CI: CIList) => CI.type,
  },
  {
    title: "Manufacturer",
    render: (CI: CIList) => CI.manufacturer,
  },
  {
    title: "Serial Number",
    render: (CI: CIList) => CI.serialNumber,
  },
  {
    title: "Model",
    render: (CI: CIList) => CI.model,
  },
  {
    title: "Description",
    render: (CI: CIList) => CI.description,
  },
];
// I think that we need to truncate description in future
