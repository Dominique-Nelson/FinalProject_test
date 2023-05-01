// import variables
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css.css"
import { FaTimes, FaPlus, FaCheck} from "react-icons/fa";
import { getAuth } from "firebase/auth";

const MovieRated = () => {
  const [movies, setMovies] = useState([true]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [added, setAdded] = useState(false);

  const Auth = getAuth();
  const user = Auth.currentUser;
  
// function to fetch popular movies
  function getMovieRated() {
    axios
      .get('http://localhost:5678/toprated') // request to the backend
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

// function to handle movie click
  const handleMovieClick = (movie) => {
    if (!selectedMovie) {
      setSelectedMovie(movie);
      console.log(movie);
      document.body.classList.add('lay');
      //document.body.style.filter = 'blur(5px)'; // remove the blur effect
    }
  };
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
        _id : new Date().getTime(),
      });
      console.log("\nRequest sent to the backend");
      //console.log(userId);
      
      setAdded(!added);
    }
  }

  // function to handle close button click
  const handleCloseClick = () => {
  setSelectedMovie(null);
  document.body.classList.remove('lay');
  setAdded(false);
  //document.body.style.filter = 'none'; // add the blur effect
};

  useEffect(() => {
    getMovieRated(); // Fetch movies data when the component mounts
  }, []);

  // function to handle previous button
  const handlePrevious = () => {
    // Decrement startIndex when "previous" button is clicked
    setStartIndex(startIndex => (startIndex === 0 ? movies.length - 5 : startIndex - 5));
  };
  
  // function to handle next button
  const handleNext = () => {
    // Increment startIndex when "next" button is clicked
    setStartIndex(startIndex => (startIndex === movies.length - 5 ? 0 : startIndex + 5));
  };

  return (
    <>
      <h4 style={{ paddingTop: "5px", margin: "10px" }}>Top Rated</h4>
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
        {movies?.slice(startIndex, startIndex + 5).map((movie) => ( // Map through movies and render movie cards
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
      
{/*  */}

        <button
          className="previous-button"
          style={{
            position: "absolute",
            left: 0,
            backgroundColor: "transparent",
            color: "white",
            paddingTop: "100px",
            height: "50px",
            marginRight: "10px",
          }}
          onClick={handlePrevious}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className="next-button"
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: "transparent",
            color: "white",
            paddingTop: "100px",
            height: "50px",
            marginLeft: "10px",
          }}
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {selectedMovie && (
          <MovieDetails movie={selectedMovie} close={handleCloseClick} />
        )}
      </div>
    </>
  );
};
export default MovieRated; // Export Popular component
