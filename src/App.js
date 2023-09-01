import { Fragment, createContext, useState, useEffect } from "react";
import Movies from "./components/Movies/Movies";
import AddMovieModal from "./components/AddMovieModal/AddMovieModal";
import axios from "axios" ;
import "./App.css";
import MovieHeader from "./components/MovieHeader/MovieHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./components/Spinner/Spinner";

export const MovieContext = createContext(null);

function App() {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(true);

  useEffect(() => {
    const moviesUrl =
      "https://data.aykhan.net/data/step-it-academy/react/task11/movies.json";
    axios
      .get(moviesUrl)
      .then((response) => {
        setMovies(response.data);
        setSpinnerVisible(false);
      })
      .catch((error) => {
        setSpinnerVisible(true);
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleAddMovie(newMovie) {
    toast.success('Movie Added Successfully!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Adjust the time (in milliseconds) as needed
    });

    setMovies([newMovie, ...movies]);
  }

  return (
    <Fragment>
      <MovieContext.Provider value={movies}>
        <MovieHeader setModalOpen={setModalOpen}></MovieHeader>
        <AddMovieModal open={modalOpen} onClose={() => setModalOpen(false)} onAddMovie={handleAddMovie}></AddMovieModal>
        <Spinner spinnerVisible={spinnerVisible}></Spinner>
        <Movies></Movies>
      </MovieContext.Provider>
      <ToastContainer></ToastContainer>
    </Fragment>
  );
}

export default App;
