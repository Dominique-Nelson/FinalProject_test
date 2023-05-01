import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route,} from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Login from "./login";
//import "./src/App.css"
import React from "react";
import { FaHome} from 'react-icons/fa';
import About from "./about";


const Bar = () => {
  
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
          className="navbar-brand"
            style={{
              fontSize: "30px",
              color: "white",
              paddingRight: "750px",
              paddingLeft: "1px"
            }}
            href="/"><FaHome style={{ marginRight: '5px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto d-flex fontSize: 20px">

          
          <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Sign in</Nav.Link>
            
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default Bar;
