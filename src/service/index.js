export { login } from "./auth";
export {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  getPaginatedAuthors,
} from "./authors";

export {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
  getPaginatedBooks,
  getBooksByName,
} from "./books";

export { getCategories } from "./categories";

export { favorite, getFavorites, unfavorite, getFavorite } from "./favorites";

export {
  confirmPurchase,
  createCheckoutOrder,
  deleteFromCheckout,
  getCheckout,
  getRentals,
  returnBook,
  getOneCheckout,
} from "./rents";

export { createReview, deleteReview, getUserReviews } from "./reviews";

export { changeImage, createUser, getUser, updateUser } from "./users";
