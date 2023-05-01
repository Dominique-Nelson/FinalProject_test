// import variables
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css.css"
import { FaTimes, FaPlus, FaCheck} from "react-icons/fa";
import { getAuth } from "firebase/auth";

/**
 * @name MovieList
 * @description Renders a list of movies and handles interactions for adding movies to a user's list.
 * @component
 * @returns {JSX.Element} The rendered MovieList component.
 */
const MovieList = () => {
  const [movies, setMovies] = useState([true]);
  //const [startIndex, setStartIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [added, setAdded] = useState(false);

  const Auth = getAuth();
  const user = Auth.currentUser;
  

  /**
   * @name getMovieList
   * @description Fetches the list of movies from the backend and updates the state.
   * @function
   */
// function to fetch list movies
  function getMovieList() {
    axios
      .get('http://localhost:5678/movies') // request to the backend
      .then(function (response) {
        setMovies(response.data); // Set fetched movies data to movies state
        console.log (response.data);
      })
      .catch(function (error) { // catch errors
        console.log(error);
      })
      .then(function () {
        // This section is empty
      });
  }

  /**
   * @name MovieDetails
   * @description Renders the movie details and controls for a selected movie.
   * @component
   * @param {Object} props - The React props object.
   * @param {Object} props.movie - The movie object.
   * @param {function} props.close - The function to close the movie details.
   * @param {function} props.add - The function to add a movie to the user's favorites.
   * @returns {JSX.Element} The rendered MovieDetails component.
   */
// function to populate the movie details
  const MovieDetails = ({ movie, close, add }) => {
     
    return (
      <div className="movie-details">
        <img className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
        <h2
          //style={{position: "absolute", top: "0", right: "0", padding: "10px", backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px", cursor: "pointer"}} 
         className="css-title">
          {movie.title}</h2>
         <br/>
        <p className="css-overview">
          {movie.overview}
        <br/>
        <br/>  
        {movie.release_date} || {movie.vote_average} || {movie.popularity}
        </p>
        <button
        style={{position: "absolute", top: "0", right: "0", paddingRight: "3px", paddingTop: "none", backgroundColor: "transparent", border: "none", color: "red", fontSize: "20px", cursor: "pointer"}} 
        onClick={close}>
          <FaTimes/>
          </button>
          <button
          style={{position: "absolute", top: "0", left: "0", paddingLeft: "13px", paddingTop: "none", backgroundColor: "white", border: "none", color: "green", fontSize: "20px", cursor: "pointer"}} 
          onClick={() => handleAdd(movie)}
          >
          {added ? <FaCheck /> : <FaPlus />}
          </button>
      </div>
    );
  };

  /**
   * @name handleMovieClick
   * @description Handles the click event on a movie card.
   * @function
   * @param {Object} movie - The movie object.
   */
// function to handle movie click
  const handleMovieClick = (movie) => {
    if (!selectedMovie) {
      setSelectedMovie(movie);
      console.log(movie);
      document.body.classList.add('lay');
      //document.body.style.filter = 'blur(5px)'; // remove the blur effect
    }
  };

  /**
   * @name handleAdd
   * @description Handles the click event on the add movie button.
   * @function
   * @param {Object} movie - The movie object.
   */
//Add movie selected to the database
  const handleAdd = (movie) => {
    //const userId = user.uid;
    //const userName = user.displayName;
    if (selectedMovie) {
      setSelectedMovie(movie);
      console.log(movie);
      axios.post('http://localhost:5678/movies/add', {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        vote_count: movie.vote_count,
        userId: user.uid, // Add the authenticated user's ID
        displayName: user.displayName, // Add the authenticated user's name
        _id : new Date().getTime(), // Add a unique ID

      });
      console.log("\nRequest sent to the backend");
      //console.log(userId);
      window.location.reload();
      setAdded(!added);
    }
  }

  /**
   * @name handleCloseClick
   * @description Handles the click event on the close movie details button.
   * @function
   */
  // function to handle close button click
  const handleCloseClick = () => {
  setSelectedMovie(null);
  document.body.classList.remove('lay');
  setAdded(false);
  //document.body.style.filter = 'none'; // add the blur effect
};

  useEffect(() => {
    getMovieList(); // Fetch movies data when the component mounts
  }, []);

  return (
    <>
      <p style={{paddingBottom: "65px", paddingTop: "65px", margin: "10px", textAlign: "center" }}>Your list is empty</p>
      <h4 style={{ paddingTop: "5px", margin: "10px" }}>People also like:</h4>
      <div
        className="movies-container"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "40%",
          overflowX: "scroll",
        }}
      >
        <br />
        {movies?.map((movie) => ( // Map through movies and render movie cards
          <div
            key={movie.id}
            className="movie-card"
            style={{ flex: "0 0 20%", padding: "5px" }}

            onClick={() => handleMovieClick(movie)} // Handle movie click
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="output">
            <div className="movie-title"
              style={{fontSize: "20px"}}>
              {movie.title}</div>
              <div className="movie-release_date"
               style={{fontSize: "16px"}}>
                 {movie.release_date}
               </div>
               <p className="movie-overview" 
               style={{maxHeight: "60px", fontSize: "14px"  }}
               >
                  {movie.overview}
                 </p>
           </div>
          </div>
        ))}
        {selectedMovie && (
          <MovieDetails movie={selectedMovie} close={handleCloseClick} />
        )}
      </div>
    </>
  );
};
export default MovieList; // Export Popular component
