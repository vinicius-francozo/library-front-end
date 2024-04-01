import baseURL from "./config";

const getAuthors = async () => {
  try {
    const response = await baseURL.get("/authors");
    return response.data;
  } catch (err) {
    return err;
  }
};

const getPaginatedAuthors = async (perPage, page) => {
  try {
    const response = await baseURL.get(
      `/authors/perPage?perPage=${perPage}&page=${page}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

const createAuthor = async (data) => {
  try {
    const response = await baseURL.post("/authors", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (err) {
    return err;
  }
};

const getAuthor = async (id) => {
  try {
    const response = await baseURL.get(`/authors/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const updateAuthor = async (id, data) => {
  try {
    const response = await baseURL.put(`/authors/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

const deleteAuthor = async (id) => {
  try {
    const response = await baseURL.delete(`/authors/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

export {
  getAuthors,
  createAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  getPaginatedAuthors,
};
