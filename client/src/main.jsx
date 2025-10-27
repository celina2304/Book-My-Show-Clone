import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import MovieProvider from "./context/movie.provider.jsx";
import UserProvider from "./context/user.provider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={2000} // Toast auto close after 5 seconds
      hideProgressBar={true} // Show progress bar
      newestOnTop={true} // Order of toasts
      closeOnClick
    />
    <BrowserRouter>
      <UserProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
