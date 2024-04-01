import baseURL from "./config";

const getCategories = async () => {
  try {
    const response = await baseURL.get("/categories");
    return response.data;
  } catch (err) {
    return err;
  }
};

export { getCategories };
