import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000, // If the API doesn't respond within 10 seconds, throw an error
});
