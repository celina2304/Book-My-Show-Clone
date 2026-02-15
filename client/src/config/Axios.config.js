import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  import.meta.env.NODE_ENV === "production"
    ? "https://book-my-show-clone-fawn-mu.vercel.app/api"
    : "http://localhost:3000/api";

const backendApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

backendApi.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export { backendApi, tmdbApi };
