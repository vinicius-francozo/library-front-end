import baseURL from "./config";

const getCategories = async () => {
  try {
    const response = await baseURL.get("/categories");
    return response.data;
  } catch (err) {
    return err;
  }
};

const createCategory = async (data) => {
  try {
    const response = await baseURL.post("/categories", { name: data });
    return response.data;
  } catch (err) {
    return err;
  }
};

export { getCategories, createCategory };
