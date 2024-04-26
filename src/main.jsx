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
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

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
        path: "/user/books/",
        element: (
          <ProtectedRoute>
            <UserBooks />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/favorite/",
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
          <ProtectedRoute isProtected={true}>
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
          <ProtectedRoute isProtected={true}>
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
        path: "/checkout/",
        element: (
          <ProtectedRoute>
            <Checkout />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const token = localStorage.getItem("token");
const client = new ApolloClient({
  link: createUploadLink({
    uri: import.meta.env.VITE_REACT_APP_BASE_URL_AND_PORT_AND_SUFFIX,
    headers: {
      Authorization: `Bearer ${token}`,
      "apollo-require-preflight": true,
    },
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);
