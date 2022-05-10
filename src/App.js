import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./components/spinner";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://react-http-df1e4-default-rtdb.firebaseio.com/movies.json`
      );
      if (!res.ok) {
        throw new Error("The request is not reached");
      }
      const data = await res.json();
      console.log(data);
      const loaddedData = [];
      for (const key in data) {
        loaddedData.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      console.log(loaddedData);

      setMovies(loaddedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      `https://react-http-df1e4-default-rtdb.firebaseio.com/movies.json`,
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "aplication/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
