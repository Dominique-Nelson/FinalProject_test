/**
 * @module Footer
 */

import React from 'react';
import { Navbar, Nav, Container} from "react-bootstrap"; // Importing necessary components from React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import 'mdbreact/dist/css/mdb.css'; // Importing styling for MDBReact
import {Link } from "react-router-dom"; // Importing Link component from React Router
import "./css.css" // Importing custom CSS styles


/**
 * The Footer component represents a footer for a web application.
 * It displays project info, team member names, and contact information.
 * The footer uses React-Bootstrap components and custom CSS styles.
 * 
 * @function Footer
 * @returns {React.Element} The Footer component rendered as a JSX.Element
 */
const Footer = () => {
  return (
    <footer> 
    <>
      <Navbar
        style={{ // Inline CSS styles for the Navbar component
          backgroundColor: "#6f42c1",
          borderTop: "2px solid white",
          borderBottom: "2px solid white",
          fontFamily: "Malayalam MN",
          fontSize: "24px"
        }}
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand
          className="navbar-brand">
            <table style ={{color: 'white', border: 'none' }} className='footer-table'> {/* Table containing information about the project */}
  <thead >
    <tr>
      <th style={{ paddingRight: '360px', paddingBottom: '10px', fontSize: '23px'}}>Project info</th>
      <th style={{ paddingRight: '360px', paddingBottom: '10px', fontSize: '23px'}}>Team Member</th>
      <th style={{ paddingBottom: '10px', fontSize: '23px'}}>Contact Us</th>
    </tr>
  </thead>
  <tbody style={{ paddingRight: '125px', fontSize: '23px'}}>
      <tr >
      <td style={{paddingBottom: '10px', fontSize: '16px'}} ><Nav.Link as={Link} target='blank' to="https://github.com/cop4808-spring-2023-fullstack-web/final-project-group17">Project Github</Nav.Link></td> {/* Link to project About page */}
        <td style={{paddingBottom: '10px', fontSize: '16px'}} >Michelob Revol</td> {/* Placeholder text */}
        <td style={{paddingBottom: '10px', fontSize: '16px'}} ><Nav.Link as={Link} target='blank' to="mailto:mrevol2021@fau.edu">Email Michelob</Nav.Link></td> {/* Link to project About page */}
      </tr>
      <tr>
        <td style={{paddingBottom: '10px', fontSize: '16px'}} ><Nav.Link as={Link} to="/about">About the project</Nav.Link></td> {/* Link to project About page */}
        <td style={{paddingBottom: '10px', fontSize: '16px'}} >Dominique Nelson</td> {/* Placeholder text */}
        <td style={{paddingBottom: '10px', fontSize: '16px'}} ><Nav.Link as={Link} target='blank' to="mailto:example@example.com">Email Dominique</Nav.Link></td> {/* Link to project About page */}
      </tr>
      <tr>
        <td style={{paddingBottom: '10px', fontSize: '16px'}} ></td> {/* Placeholder text */}
        <td style={{paddingBottom: '10px', fontSize: '16px'}} >Juan Rivera</td> {/* Placeholder text */}
        <td style={{paddingBottom: '10px', fontSize: '16px'}} ><Nav.Link as={Link} target='blank' to="mailto:juanrivera2018@fau.edu">Email Juan</Nav.Link></td> {/* Link to project About page */}
      </tr>
      <tr>
        <td style={{paddingBottom: '10px', fontSize: '16px'}} ></td> {/* Placeholder text */}
        <td style={{paddingBottom: '10px', fontSize: '16px'}} > Ivan Paez </td> {/* Placeholder text */}
        <td style={{paddingBottom: '10px', fontSize: '16px'}} ><Nav.Link as={Link} target='blank' to="mailto:ipaez2019@fau.edu">Email Ivan</Nav.Link></td> {/* Link to project About page */}
      </tr>
        
  </tbody>
</table>

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Toggle button for mobile devices */}
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto d-flex fontSize: 20px"> {/* Navigation links (currently empty) */}
            
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
    </footer>
  );
};

export default Footer; // Exporting Footer component
