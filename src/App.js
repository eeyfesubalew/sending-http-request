import React, { useEffect, useState } from "react";
import Spinner from "./components/spinner";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchMovieHandler() {
    setIsLoading(true);
    try {
      const res = await fetch(`https://swapi.dev/api/films`);
      if (!res.ok) {
        throw new Error("The request is not reached");
      }
      const data = await res.json();
      console.log(data.results);
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }
  // useEffect(() => {
  //   const getData = async function () {
  //     const res = await fetch(`https://swapi.dev/api/films`);
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   getData();
  // }, []);

  let content = <p>Found no movie</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <Spinner />;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
