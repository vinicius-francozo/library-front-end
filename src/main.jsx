import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  CreateUser,
  Home,
  IndexBook,
  NotFound,
  ShowUser,
  CreateBook,
  ShowBook,
  UpdateBook,
  IndexAuthor,
  ShowAuthor,
  CreateAuthor,
  UpdateAuthor,
  Checkout,
  UserBooks,
  HomePage,
  Login,
  ProtectedRoute,
  UserFavorite,
} from "./components";
import { AuthProvider } from "./context";

const router = createBrowserRouter([
  {
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/user/show/:userId",
        element: (
          <ProtectedRoute>
            <ShowUser />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/books/:userId",
        element: (
          <ProtectedRoute>
            <UserBooks />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/favorite/:userId",
        element: (
          <ProtectedRoute>
            <UserFavorite />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/create",
        element: <CreateUser />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/book",
        element: <IndexBook />,
      },
      {
        path: "/book/create",
        element: (
          <ProtectedRoute>
            <CreateBook />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/book/show/:bookId",
        element: <ShowBook />,
      },
      {
        path: "/book/update/:bookId",
        element: (
          <ProtectedRoute>
            <UpdateBook />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/author",
        element: <IndexAuthor />,
      },
      {
        path: "/author/create",
        element: (
          <ProtectedRoute>
            <CreateAuthor />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/author/show/:authorId",
        element: <ShowAuthor />,
      },
      {
        path: "/author/update/:authorId",
        element: (
          <ProtectedRoute>
            <UpdateAuthor />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout/:userId",
        element: (
          <ProtectedRoute>
            <Checkout />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
