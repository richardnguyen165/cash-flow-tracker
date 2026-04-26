// Interceptor
// Intercept any request we are sending, and add the correct headers (making sure that we are authorized to view a page)

// We will use axios

// Source for learning: https://www.youtube.com/watch?v=c-QsfbznSXI

import axios from "axios"
import { ACCESS_TOKEN }from "../constants/constants.js"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
  (config) => {
    // We will need to check if we have an access token in local storage (this indicates if we are logged in)

    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      // Add token to authroization header when sending to Django backend
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    console.log("Successful intercept.")
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
)

export default api;


