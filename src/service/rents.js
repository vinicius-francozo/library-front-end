import baseURL from "./config";

const getCheckout = async () => {
  try {
    console.log(baseURL.url())

    const response = await baseURL.get("/rents/checkout");
    return response.data;
  } catch (err) {
    return err;
  }
};

const getOneCheckout = async (bookId) => {
  try {
    const response = await baseURL.get(`/rents/checkout/${bookId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const getRentals = async () => {
  try {
    const response = await baseURL.get("/rents");
    return response.data;
  } catch (err) {
    return err;
  }
};

const createCheckoutOrder = async (bookId) => {
  try {
    const response = await baseURL.post(`/rents/${bookId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const confirmPurchase = async () => {
  try {
    const response = await baseURL.put(`/rents`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const returnBook = async (rentId) => {
  try {
    const response = await baseURL.patch(`/rents/${rentId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const deleteFromCheckout = async (rentId) => {
  try {
    const response = await baseURL.delete(`/rents/${rentId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export {
  getCheckout,
  getRentals,
  createCheckoutOrder,
  confirmPurchase,
  returnBook,
  deleteFromCheckout,
  getOneCheckout,
};
