import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_REACT_APP_AUTH_ROUTE,
      {
        username: username,
        password: password,
      },
      {}
    );
    const authToken = response.headers["x-access-token"];
    return authToken;
  } catch (err) {
    return err;
  }
};

export { login };
