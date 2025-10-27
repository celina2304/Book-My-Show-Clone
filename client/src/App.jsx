import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Pages
import HomePage from "./pages/Home.page";
import Movie from "./pages/Movie.page";
import Plays from "./pages/Plays.page";

import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/Default.layout";
import MovieLayout from "./layouts/Movie.layout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieLayout>
              <Movie />
            </MovieLayout>
          }
        />
        <Route
          path="/plays"
          element={
            <DefaultLayout>
              <Plays />
            </DefaultLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
