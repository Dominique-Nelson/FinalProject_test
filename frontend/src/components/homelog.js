/**
 * Imports necessary CSS files and components
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css.css"
import Popularlog from './popularlog';
import UpcomingMovies from './uplog';
import MovieRated from './toplog';
import PlayMovie from './playinglog';

/**
 * Homelog component that combines PlayMovie, Popularlog, UpcomingMovies, and MovieRated components
 * @function
 * @returns {JSX.Element} A JSX element containing the rendered components
 */
const Homelog = () => {
 
  return (
    <>
    <PlayMovie />
    <Popularlog/>
    <UpcomingMovies/>
    <MovieRated />
    
       
    </>
  );

};

/**
 * Exports the Homelog component
 * @type {function}
 */
export default Homelog;
