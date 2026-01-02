import { getTrendingMovies, updateSearchCount } from './appwrite.js'
import MovieCard from './components/MovieCard';
import MovieDetailModal from './components/MovieDetailModal';
import Search from './components/Search'
import Spinner from './components/Spinner.jsx'
import ThemeToggle from './components/ThemeToggle';
import ParticlesBackground from './components/ParticlesBackground';
import HeroCards from './components/HeroCards';
import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debounceSearchTerm, setdebounceSearchTerm] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trendingRank, setTrendingRank] = useState(null);

  // debunce search term
  useDebounce(() => {
    setdebounceSearchTerm(searchTerm)
  }, 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setisLoading(true);
    seterrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.response === 'FALSE') {
        seterrorMessage(data.error || 'failed to fetch movie');
        setmovieList([]);
        return;
      }

      setmovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      seterrorMessage('Error fetch movie, please try again later.');
    } finally {
      setisLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm])

  useEffect(() => {
    loadTrendingMovies();
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">

      <ParticlesBackground />

      <div className="wrapper relative z-10">
        <ThemeToggle />
        <header>
          <HeroCards />
          <h1>Find <span className='text-highlight'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li
                  key={movie.$id}
                  onClick={() => {
                    setSelectedMovie(movie);
                    setTrendingRank(index + 1);
                  }}
                >
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2> All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={(m) => {
                    setSelectedMovie(m);
                    setTrendingRank(null);
                  }}
                />
              ))}
            </ul>
          )}
        </section>
      </div>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => {
            setSelectedMovie(null);
            setTrendingRank(null);
          }}
          trendingRank={trendingRank}
        />
      )}

    </main>
  )
}

export default App