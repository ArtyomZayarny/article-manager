export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  let day = date.getDate();

  let month = date.getMonth();

  let year = date.getFullYear();

  let format = month + '-' + day + '-' + year;

  return format;
};
