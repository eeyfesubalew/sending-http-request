import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  function fetchMovieHandler() {
    fetch(`https://swapi.dev/api/films`)
      .then((res) => res.json())
      .then((data) => {
        const transformedData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedData);
      });
  }
  // useEffect(() => {
  //   const getData = async function () {
  //     const res = await fetch(`https://swapi.dev/api/films`);
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   getData();
  // }, []);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
