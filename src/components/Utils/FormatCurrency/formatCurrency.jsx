export const formatBDT = (value) => {
  return `৳${Number(value || 0).toLocaleString("en-BD")}`;
};
