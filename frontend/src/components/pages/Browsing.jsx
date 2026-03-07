import { useSearchParams } from "react-router-dom";
import Navbar from "../subcomponents/Navbar";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { fetchMoviesBySearch } from "../../api/moviesApi";
import { MoonLoader } from "react-spinners";
import Movie from "../subcomponents/Movie";

const genres = [
  "Action",
  "Adventure",
  "Science Fiction",
  "Crime",
  "Mystery",
  "Thriller",
  "Animation",
  "Comedy",
  "Family",
  "Fantasy",
  "War",
  "Horror",
  "Drama",
  "Music",
  "Romance",
  "Western",
  "History",
  "TV Movie",
  "Documentary",
];

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

const Browsing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // initial q from URL
  const initialQ = searchParams.get("q") || "";

  const [q, setQ] = useState(initialQ);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // debounce q so we don't call API on every keypress
  const debouncedQ = useDebounce(q, 400);

  // keep URL in sync with q
  useEffect(() => {
    if (q && q.trim()) setSearchParams({ q: q.trim() });
    else setSearchParams({});
  }, [q, setSearchParams]);

  // stable sorted array for queryKey (prevents refetch from order differences)
  const normalizedGenres = useMemo(() => {
    return [...selectedGenres].sort();
  }, [selectedGenres]);

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: isSearchError,
    error: searchError,
  } = useQuery({
    queryKey: ["searchMovies", debouncedQ, normalizedGenres],
    queryFn: () => fetchMoviesBySearch(debouncedQ, normalizedGenres),
    // only fetch if there's something to search/filter
    enabled: !!debouncedQ || normalizedGenres.length > 0,
    staleTime: 30 * 1000,
  });

  function handleGenreToggle(genreName) {
    setSelectedGenres((prev) => {
      if (prev.includes(genreName)) return prev.filter((g) => g !== genreName);
      return [...prev, genreName];
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar authControls={false} />

      <form
        className="search-controls flex flex-col min-w-9/10 mt-5 gap-5 items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="border w-full rounded-xl">
          <input
            className="outline-black rounded-xl px-4 py-2 md:text-2xl w-full h-10 md:h-15"
            id="q"
            name="q"
            placeholder="Search for movies..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="genreList bg-gray-200 min-w-9/10 rounded-sm grid grid-cols-2 py-5 px-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
          {genres.map((g) => (
            <div
              key={g}
              className="genreControl flex gap-2 items-center border-2 border-gray-300 rounded-sm cursor-pointer hover:bg-gray-300"
              onClick={() => handleGenreToggle(g)}
            >
              <input
                type="checkbox"
                name="genre"
                id={g}
                value={g}
                className="w-6"
                checked={selectedGenres.includes(g)}
                onChange={() => handleGenreToggle(g)} // for keyboard accessibility
                onClick={(e) => e.stopPropagation()} // prevent double toggle
              />
              <label
                htmlFor={g}
                className="genreItem h-full flex items-center text-sm md:text-xl flex-1 justify-start"
              >
                {g}
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="px-4 py-2 mt-5 w-fit bg-[#cf384d] items-center h-12 md:h-15 gap-1 flex text-md rounded-md md:text-xl"
        >
          <img src="/assets/search_icon.svg" alt="" width={20} />
          Search
        </button>
      </form>

      {/* Heading */}
      {q ? (
        <h1 className="my-10 text-xl text-center md:text-3xl text-gray-600">
          Results for: {q}
        </h1>
      ) : (
       (selectedGenres.length != 0 ? <div className="my-10"> </div> :  
	   <h1 className="my-10 text-xl text-center md:text-3xl text-gray-600">
          Search for movies to browse reviews and ratings!
        </h1>)
      )}

      {/* Loading / Error */}
      {searchLoading && (
		<MoonLoader
			className="scale-75 lg:scale-100"
			size={100}
			speedMultiplier={0.5}
		/>
      )}

      {isSearchError && (
        <div className="mt-6 text-red-500">
          {searchError?.message || "Error while searching"}
        </div>
      )}

      {/* Results (you can render however your API returns) */}
      {searchData?.movies?.length > 0 && (
        <div className="grid grid-col-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {searchData.movies.map((m) => (
			<Movie {...m} />
          ))}
        </div>
      )}

      {searchData && (!searchData.movies || searchData.movies.length === 0) && (
        <div className="mt-6 text-gray-500 text-xl md:text-2xl ">No results.</div>
      )}
    </div>
  );
};

export default Browsing;