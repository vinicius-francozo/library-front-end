import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:3001/auth/login",
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
