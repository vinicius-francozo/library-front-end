import baseURL from "./config";

const getUserReviews = async (userId) => {
  try {
    const response = await baseURL.get(`/reviews/${userId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

const createReview = async (data, bookId) => {
  try {
    const response = await baseURL.post(`/reviews/${bookId}`, { ...data });
    return response.data;
  } catch (err) {
    return err;
  }
};

const updateReview = async (data, reviewId) => {
  try {
    const response = await baseURL.put(`/reviews/${reviewId}`, { ...data });
    return response.data;
  } catch (err) {
    return err;
  }
};

const deleteReview = async (reviewId) => {
  try {
    const response = await baseURL.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export { createReview, deleteReview, getUserReviews, updateReview };
