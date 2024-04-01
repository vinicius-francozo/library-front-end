import baseURL from "./config";

const getFavorites = async () => {
  try {
    const response = await baseURL.get("/favorites");
    return response.data;
  } catch (err) {
    return err;
  }
};

const getFavorite = async (bookId) => {
  try {
    const response = await baseURL.get(`/favorites/${bookId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const favorite = async (bookId) => {
  try {
    const response = await baseURL.post(`/favorites/${bookId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const unfavorite = async (bookId) => {
  try {
    const response = await baseURL.delete(`/favorites/${bookId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export { getFavorites, favorite, unfavorite, getFavorite };
