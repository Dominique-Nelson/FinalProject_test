import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from "react-router-dom";
import { Link } from "react-router-dom";
import Homelog from "./homelog";
import { MDBCol} from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useState, useEffect, React } from "react";
import { FaHome} from 'react-icons/fa';
import MyList from "./list";
import SearchMovies from "./search";
import About from "./about";


const Barlog = () => {

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

const handleSearchInput = (event) => {
  setSearchQuery(event.target.value);
};


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user object to state when logged in
      } else {
        setUser(null); // Set the user object to null when logged out
      }
    });
  }, []);
  
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Update the user state to null
        setUser(null);
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      });
  };

  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#6f42c1",
          border: "2px solid black",
          fontFamily: "Malayalam MN",
          fontSize: "24px"
        }}
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand
            style={{
              fontSize: "30px",
              color: "white",
              paddingRight: "100px",
              paddingLeft: "1px"
            }}
            href="/"><FaHome style={{ marginRight: '5px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" fontSize: 20px">

            <Nav.Link as={Link} onClick={handleLogout} style={{ marginRight: '3px' }} to="/">Sign out</Nav.Link>
            <Nav.Link as={Link} style={{ marginRight: '5px' }}  to="/list">My List</Nav.Link>
            <div className="display-name" style={{ marginRight: '17px' }}> {user && `Hi, ${user.displayName}`}
            
            </div>
          </Nav>

          <MDBCol md="6">
            <div >
              <input
              id="search-input"
              className="search-bar"
              style={{
              border: "2px solid #6f42c1",
              width: "50%",
              padding: "3px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
            type="text"
            placeholder="Search movies"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchInput}/>
            
            <button
            className="search-button"
            type="button"
            onClick={() => {
              window.location.href = `/search?query=${searchQuery}`;
            }}
            
            >
              Search
              </button>
             </div>
            </MDBCol>
          </Navbar.Collapse>
        </Container>
      </Navbar>

     <Routes>
        <Route path="/search" element={<SearchMovies/>} />
        <Route path="/" element={<Homelog />} />
        <Route path="/list" element={<MyList/>} />
        <Route path="/about" element={<About/ >} />
     
      </Routes>
      
    </>
  );
}
  
export default Barlog;
