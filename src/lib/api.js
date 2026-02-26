import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000, // If the API doesn't respond within 10 seconds, throw an error
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // API returned an error status
      throw new Error(
        `API Error: ${error.response.status} ${error.response.statusText}`,
      );
    } else if (error.request) {
      // Request made but no response
      throw new Error("Network error: No response from API");
    } else {
      // Error in request setup
      throw error;
    }
  },
);
