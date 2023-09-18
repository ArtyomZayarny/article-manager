export const sortByDate = (data, order = "newest") => {
  return data.sort((a, b) => {
    return order === "newest"
      ? new Date(b.createDateTime) - new Date(a.createDateTime)
      : new Date(a.createDateTime) - new Date(b.createDateTime);
  });
};
