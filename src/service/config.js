import axios from "axios";

const token = localStorage.getItem("token");

const libraryFetch = axios.create({
  baseURL: "http://127.0.0.1:3001",
  timeout: 10000,
  headers: {
    Authorization: token,
  },
});

export default libraryFetch;
