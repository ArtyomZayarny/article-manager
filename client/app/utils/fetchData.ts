export const fetchData = async (url: string, data: any, method: string) => {
  const res = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};
