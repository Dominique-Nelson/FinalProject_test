import React, { useState } from 'react';
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { Route, Routes } from 'react-router-dom';
import Homelog from './homelog';
import {GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { FaGoogle} from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const provider = new GoogleAuthProvider();

 const handleGoogleLogin = async () => {
     signInWithPopup(auth, provider)
     .then((result) => {
       // This gives you a Google Access Token. You can use it to access the Google API.
       const credential = GoogleAuthProvider.credentialFromResult(result);
       const token = credential.accessToken;
       console.log(token)
       // The signed-in user info.
       const user = result.user;
       console.log(user)
       navigate("/")
       // IdP data available using getAdditionalUserInfo(result)
       // ...
     }).catch((error) => {
       // Handle Errors here.
       const errorCode = error.code;
       const errorMessage = error.message;
       console.log(errorCode)
      console.log(errorMessage)
       // The email of the user's account used.
       const email = error.customData.email;
       console.log(email)
       // The AuthCredential type that was used.
       const credential = GoogleAuthProvider.credentialFromError(error);
       console.log(credential)
       // ...
     });
   }

  const onLogin = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Please fill all fields');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
        if (
          errorCode === AuthErrorCodes.INVALID_PASSWORD ||
          errorCode === AuthErrorCodes.USER_DELETED
        ) {
          setError("The email address or password is incorrect");
        } else {
          console.log(errorCode);
          setError(errorMessage);
        }
      });
  }

    return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '60vh',
            padding: '5%',
            maxHeight: '80vh', // Set maximum height to make sure background covers entire viewport
            minHeight: '80vh', // Set minimum height to make sure background covers entire viewport
          }}
        >
          <div
            style={{
                width: '60%',
                maxWidth: '400px',
                height: '100%',
                padding: '20px',
                background: 'white',
                borderroradius: '5px',
                color: 'black',
                textAlign: 'center',
            }}
          >
            <h1>Login</h1>
            <form >
              <br />
              <label htmlFor="email"></label>
              <input
                style={{
                    border: '2px solid #6f42c1',
                    width: '100%', // Update width to desired size, e.g. '300px'
                    padding: '10px', // Add padding for spacing
                
                    fontSize: '20px'}}
                type="email"
                id="email"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                //value={formData.email}
                placeholder="Email address"
              />
              <br />
              <br />
              <label htmlFor="password"></label>
              <input
                style={{
                    border: '2px solid #6f42c1',
                    width: '100%', // Update width to desired size, e.g. '300px'
                    padding: '10px', // Add padding for spacing
                    borderroradius: '5px', // Add border radius for rounded edges
                    fontSize: '20px'}}
                type="password"
                id="password"
                name="password"
                //value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
              />
              <br />
              <br />
              <button style={{ 
                backgroundColor: '#6f42c1',
                border: '2px solid black',
                color: 'white',
                width: '100%', // Update width to desired size, e.g. '300px'
                padding: '10px',
                 // Add padding for spacing
                fontSize: '23px'}} 
                onClick={onLogin}
                >Login</button>
            </form>
            <br />
            <button 
         style={{ 
          backgroundColor: '#6f42c1',
          border: '2px solid black',
          color: 'white',
          width: '100%', // Update width to desired size, e.g. '300px'
          padding: '5px', // Add padding for spacing
          fontSize: '25px',
          cursor: 'pointer'
        }}
        type="button"
         onClick={handleGoogleLogin}>
            <FaGoogle style={{ marginRight: '10px' }} /> Login with Google</button>

        <br/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br />
          </div>
          <Routes>
            <Route path="/homelog" element={<Homelog />} />
        </Routes>
        </div>
        
      );
    };

export default Login;