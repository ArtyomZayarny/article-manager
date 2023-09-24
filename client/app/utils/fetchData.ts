export const fetchData = async (url: string, method: string, data?: any) => {
  const accessToken = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken")!)
    : null;
  const res = await fetch(url, {
    method,
    body: data && JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.json();
};
