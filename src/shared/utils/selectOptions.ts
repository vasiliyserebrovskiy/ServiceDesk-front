// For required fields, an empty placeholder.
export const toSelectOptions = <T extends { id: string; name?: string }>(
  items: T[],
  getLabel: (item: T) => string,
) => [
  { value: "", label: "" },
  ...(items?.map((item) => ({
    value: item.id,
    label: getLabel(item),
  })) || []),
];

// For optional fields — None
export const toNullableSelectOptions = <T extends { id: string }>(
  items: T[],
  getLabel: (item: T) => string,
) => [
  { value: "", label: "-- None --" },
  ...(items?.map((item) => ({
    value: item.id,
    label: getLabel(item),
  })) || []),
];
