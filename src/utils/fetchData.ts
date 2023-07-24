export const fetchData = async ({
  method,
  path,
  body,
  headers,
}: RequestInit & { path: string }) => {
  try {
    const token = `Bearer ${localStorage.getItem("access_token")}`;
    const response = await fetch(path, {
      method,
      body,
      headers: {
        ...headers,
        Authorization: token,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      const errorCode = response.status;
      if (response.status === 401) {
        return window.open("/login", "_self");
      }
      throw new Error(
        `Request failed with status ${errorCode}: ${JSON.stringify(errorData)}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error occurred:", error);
  }
};
