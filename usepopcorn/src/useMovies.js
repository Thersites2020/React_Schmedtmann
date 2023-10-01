import { useState, useEffect } from "react";

// From omdbapi.com
const APIKey = 'e3c17378';

export default function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function() {
       //     callback?.();

          const controller = new AbortController();
        
          async function fetchMovies() {
            try {
              setisLoading(true);
              setError('');
              const res = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${query}`,
              { signal: controller.signal}
              );
    
              if(!res.ok) {
                throw new Error("Something went wrong while fetching movies.")
              }
    
              const data = await res.json();
    
              if(data.Response === 'False') {
                throw new Error('Movie not found.')
              }
    
              setMovies(data.Search);
              setError("");
            } catch(err) {
              if(err.name !== 'AbortError') {
                console.log(err.name);
                setError(err.message);
              }
            } finally {
              setisLoading(false);
            }
          }
    
          if(query.length < 3) {
            setMovies([]);
            setError('');
            return;
          }
    
        //   handleCloseMovie();
          fetchMovies();
    
          return function () {
            controller.abort();
          }
        }, [query]);
    return {movies, isLoading, error};
}