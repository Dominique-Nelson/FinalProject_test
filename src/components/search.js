// import variablesree-solid-svg-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css.css"
import { FaTimes, FaPlus, FaCheck} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Popularlog from "./popularlog";
import { useLocation } from "react-router-dom";


/**
 * @name SearchMovies
 * @description Renders a list of movies based on a search term and allows users to add movies to their favorites.
 * @component
 * @returns {JSX.Element} The rendered SearchMovies component.
 */
const SearchMovies = () => {
  const [movies, setMovies] = useState([true]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [added, setAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const Auth = getAuth();
  const user = Auth.currentUser;

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    // Fetch the movies from the backend to display favorite movies
    axios
    .get(`http://localhost:5678/search/${searchQuery}`) // request to the backend
    .then(function (response) {
        setMovies(response.data);
        setIsLoading(false);
        console.log(response.data);
        if (response.data.length === 0) {
          setIsEmpty(true); // If user had no movie saved in data, set isEmpty to true
          
        }
      })
      // Catch any error here
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [setMovies, searchQuery]);


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
      style={{position: "absolute", top: "0", right: "0", paddingRight: "3px", paddingTop: "none", backgroundColor: "transparent", border: "none", color: "black", fontSize: "20px", cursor: "pointer"}} 
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
      _id : new Date().getTime(),
    });
    console.log("\nRequest sent to the backend");
    //console.log(userId);
    
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

 // Render the movie list
 return (
  <>
    
    {isLoading ? (
  <div>Loading...</div>
) : (
  <div>
    <h4 style={{paddingBottom: "5px", paddingTop: "5px", margin: "10px" }}>
      Results for <span style={{fontWeight: "bold", textTransform: "capitalize"}}>"{searchQuery.toUpperCase()}"</span>
    </h4>
    {isEmpty ? (
      <p 
        style={{ paddingBottom: "65px", paddingTop: "65px", margin: "10px", textAlign: "center" }}>
        We don't have this, but here are some popular movies
        <div style={{ paddingBottom: "65px", paddingTop: "65px", margin: "10px", textAlign: "left" }}>
          <Popularlog />
        </div>
      </p>
    ) : (

      <div
        className="movies-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "none",
          width: "100%",
          height: "160%",
          overflow: "auto",
          scrool : "auto",
        }}
      >
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            style={{ flexBasis: "20%", marginBottom: "20px" }}
            onClick={() => handleMovieClick(movie)} // Handle movie click
          >
            {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
            ) : (
            <img src="https://via.placeholder.com/500x750.png?text=No+Poster+Available" alt="No Poster found" />
            )}
              <div className="output">
                {movie.title}
                <br />
                {movie.release_date}
                </div>
                <br />
            </div>
          ))}
           {selectedMovie && (
          <MovieDetails movie={selectedMovie} close={handleCloseClick} />
        )}
        </div>
         )}
         </div>
       )}
    </>
  );
};
export default SearchMovies;
