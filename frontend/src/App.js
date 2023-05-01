import "./App.css";
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Footer from "./components/footer";
import Bar from './components/navbar';
import Barlog from './components/navlog';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Add state to track user login status

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true); // Update state to indicate user is logged in
        console.log("User is logged in");
        console.log(user);
      } else {
        setIsUserLoggedIn(false); // Update state to indicate user is logged out
      }
    });
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div>
      {isUserLoggedIn ? <Barlog /> : <Bar />} {/* Use conditional rendering to display correct Navbar */}
      {/* Render other content */}
      <Footer />
    </div>
  );
}

export default App;