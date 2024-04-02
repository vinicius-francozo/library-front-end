import axios from "axios";

const token = localStorage.getItem("token");

const libraryFetch = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL_AND_PORT,
  timeout: 10000,
  headers: {
    Authorization: token,
  },
});

export default libraryFetch;
