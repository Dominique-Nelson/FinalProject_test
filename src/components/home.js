/**
 * Imports necessary CSS files and components
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css.css"
import Upcoming from "./upcoming";
import NowPlaying from "./now_playing";
import TopRated from "./top_rated";
import Popular from "./popular";

/**
 * Home component that combines Popular, NowPlaying, Upcoming, and TopRated components
 * @function
 * @returns {JSX.Element} A JSX element containing the rendered components
 */
const Home = () => {
 
  return (
    <>
      <Popular/>
      <NowPlaying />
      <Upcoming />
      <TopRated/>  
    </>
  );

};

/**
 * Exports the Home component
 * @type {function}
 */
export default Home;
