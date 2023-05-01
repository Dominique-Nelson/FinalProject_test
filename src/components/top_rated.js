
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css.css"


const TopRated = () => {
  const [movies, setMovies] = useState([true]);
  const [startIndex, setStartIndex] = useState(0);
 
  function getTop() {
    axios
      .get('http://localhost:5678/toprated')
      .then(function (response) {
        setMovies(response.data); // Set fetched movies data to movies state
        console.log (response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // This section is empty
      });
  }

  useEffect(() => {
    getTop(); // Fetch movies data when the component mounts
  }, []);

  const handlePrevious = () => {
    // Decrement startIndex when "previous" button is clicked
    setStartIndex(startIndex => (startIndex === 0 ? movies.length - 5 : startIndex - 5));
  };
  
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
        {movies?.slice(startIndex, startIndex + 5).map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            style={{ flex: "0 0 20%", padding: "5px" }}
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
      </div> 
    </>
  );

};

export default TopRated;
