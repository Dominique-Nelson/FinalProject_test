import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css.css"
import { getAuth } from "firebase/auth";
import MovieList from "./createlist";
import { FaTimes, FaMinus} from "react-icons/fa";

const MyList = () => {
  const [movies, setMovies] = useState([]);
  //const [userId, setUserId] = useState("");
  const [isLoading, setisLoading] = useState(false); // Initializing a state variable called isLoading with an initial value of false
  const [isEmpty, setIsEmpty] = useState(false); // Initializing a state variable called isEmpty with an initial value of false
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const Auth = getAuth();
  
  const user = Auth.currentUser;
  const userId = user.uid;
 
  useEffect(() => {
    // Fetch the movies from the backend to display favorite movies
    axios.get(`http://localhost:5678/movies/${userId}`)
      .then(function (response) {
        setMovies(response.data);
        setisLoading(false);
        if (response.data.length === 0) {
          setIsEmpty(true); // If user had no movie saved in data, set isEmpty to true
          
        }
      })
      // Catch any error here
      .catch(function (error) {
        console.log(error);
        setisLoading(false);
      });
  }, [userId, setMovies]);

// function to handle movie click
const handleMovieClick = (movie) => {
  if (!selectedMovie) { // if selectedMovie is null, set the selected movie to the movie that was clicked
    setSelectedMovie(movie); // set the selected movie to the movie that was clicked
    console.log(movie);
    document.body.classList.add('lay');
    //document.body.style.filter = 'blur(5px)'; // remove the blur effect
  }
};

// function to handle delete button click
const handleDeleteClick = (movie) => {
  // Refresh the page after deleting the movie
  window.location.reload();

}
 // function to handle close button click
 const handleCloseClick = () => {
  setSelectedMovie(null);
  document.body.classList.remove('lay'); // remove the  effect
  setDeleted(false);
  //document.body.style.filter = 'none'; // add the blur effect
};

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
      {/*  */}
      {movie.release_date} || {movie.vote_average} || {movie.popularity}
      </p>
      <button
      style={{position: "absolute", top: "0", right: "0", paddingRight: "3px", paddingTop: "none", backgroundColor: "transparent", border: "none", color: "black", fontSize: "20px", cursor: "pointer"}} 
      onClick={close}>
        <FaTimes/>
        </button>
        <button
        style={{position: "absolute", top: "0", left: "0", paddingLeft: "13px", paddingTop: "none", backgroundColor: "white", border: "none", color: "red", fontSize: "20px", cursor: "pointer"}} 
        onClick={() => handleDelete(movie)}
        >
        {deleted ? handleDeleteClick()  : <FaMinus />} 
        </button>
        
    </div>
  );
};

//Delete movie selected to the database
const handleDelete = (movie) => {
  if (selectedMovie) {
    setSelectedMovie(movie); // set the selected movie to the movie that was clicked
    console.log(movie);
    console.log (movie._id);

    axios.delete(`http://localhost:5678/movies/${movie._id}`)
      .then((response) => {
        console.log(response);
        setDeleted(true);
        console.log("Request to delete movie sent");
      })
      .catch((error) => {
        console.log(error);
      });
      setDeleted(deleted);
  }
}

// Render the movie list
  return (
    <>
      <h4 style={{paddingBottom: "5px", paddingTop: "5px", margin: "10px" }}>My Favorite Movies</h4>
      {isLoading ? (
        <p>Loading...</p>
      ) : isEmpty ? (
        <MovieList/>
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
            marginBottom: "80px"
          }}
        >
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              style={{ flexBasis: "20%", marginBottom: "20px" }}
              onClick={() => handleMovieClick(movie)} // Handle movie click
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="output">
                {movie.title}
                <br />
                {movie.release_date}
              </div>
            </div>
          ))}
           {selectedMovie && (
          <MovieDetails movie={selectedMovie} close={handleCloseClick} />
        )}
        </div>
      )}
    </>
  );
};

export default MyList;

