import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetchMovieHandler() {
    setIsLoading(true);
    const res = await fetch(`https://swapi.dev/api/films`);
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

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movie</p>}
        {isLoading && <p>Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
