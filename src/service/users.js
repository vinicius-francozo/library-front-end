import baseURL from "./config";

const getUser = async (userId) => {
  try {
    const response = await baseURL.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const updateUser = async (data, userId) => {
  try {
    const response = await baseURL.put(`/users/${userId}`, { ...data });
    return response.data;
  } catch (err) {
    return err;
  }
};

const changeImage = async (image, userId) => {
  try {
    const response = await baseURL.put(`/users/changeImage/${userId}`, image);
    return response.data;
  } catch (err) {
    return err;
  }
};

const createUser = async (data) => {
  try {
    const response = await baseURL.post(`/users`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export { changeImage, createUser, getUser, updateUser };
