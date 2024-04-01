import baseURL from "./config";

const getBooks = async () => {
  try {
    const response = await baseURL.get("/books");
    return response.data;
  } catch (err) {
    return err;
  }
};

const getPaginatedBooks = async (perPage, page) => {
  try {
    const response = await baseURL.get(
      `/books/perPage?perPage=${perPage}&page=${page}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

const getBooksByName = async (query) => {
  try {
    const response = await baseURL.get(`/books/find/${query}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const createBook = async (data) => {
  try {
    const response = await baseURL.post("/books", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (err) {
    return err;
  }
};

const getBook = async (id) => {
  try {
    const response = await baseURL.get(`/books/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const updateBook = async (id, data) => {
  try {
    const response = await baseURL.put(`/books/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

const deleteBook = async (id) => {
  try {
    const response = await baseURL.delete(`/books/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

export {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  getPaginatedBooks,
  getBooksByName,
};
