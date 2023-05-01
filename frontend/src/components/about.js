const About = () => {
  return (
    <div className="About" style={{margin: "10px"}}>
      <h2>About</h2>
      <p>
        This movie application allows you to explore a wide range of movies, log in to your account, search for movies, and add them to your favorites list. 
      </p>
      <p>
        The app consists of a navigation bar, content sections for popular movies, now playing movies, top-rated movies, and upcoming movies. It also includes additional pages like the About page, Register page, and Login page. A footer component is present at the bottom of the app.
      </p>
      <h3>Features</h3>
      <ul>
        <li>Browse popular movies</li>
        <li>Discover now playing movies</li>
        <li>Explore top-rated movies</li>
        <li>Get information about upcoming movies</li>
        <li>Search for movies using keywords</li>
        <li>Register and log in to your account</li>
        <li>Add movies to your favorites list</li>
      </ul>
      <h3>How it works</h3>
      <p>
        The app is built using:
      </p>
      <ul>
        <li>React: A JavaScript library for building user interfaces.</li>
        <li>React Router: A library for handling routing within a React application.</li>
        <li>React Bootstrap: A library that provides pre-designed components and styles for building responsive web applications.</li>
        <li>Firebase Authentication: A service that provides secure user authentication for web and mobile apps.</li>
        <li>The Movie Database (TMDb) API: An API that provides access to a vast collection of movie data.</li>
        <li>MangoDB: To store the data for the user when add a favorite list.</li>
      </ul>
    </div>
  );
};
export default About;
