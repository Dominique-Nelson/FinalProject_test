import React, { useState } from 'react';
import { AuthErrorCodes, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
//import handleGoogleLogin from './googlelog';
import {GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { FaGoogle} from 'react-icons/fa';


const Register = () => {
  const navigate = useNavigate(); // Initialize navigate() hook
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName,setDisplayName] = useState('');

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

    const onSubmit = async (e) => {
      e.preventDefault()
      
      // Check if password and confirmPassword match
       if (password !== confirmPassword) {
          setError("Password do not match.");
          //document.getElementById("password").classList.add("input-error");
          //document.getElementById("confirmPassword").classList.add("input-error");
          //document.getElementById("password").style.borderColor = "red";
          //document.getElementById("confirmPassword").style.borderColor = "red";
         return; // Exit function if passwords don't match
        }
        else if (password.length < 6) {
          if (password === "") {
            setError("All fields are required.");
          }
          else if (confirmPassword === "") {
            setError("All fields are required.");
          }
          else {
          setError("Password must be at least 6 characters.");
          //document.getElementById("password").classList.add("input-error");
         // document.getElementById("password").style.borderColor = "red";
          }
          return; // Exit function if password is too short
        }
        else if (displayName.length < 3) {
          setError("username must be at least 3 characters.");
          //document.getElementById("displayName").classList.add("input-error");
          //document.getElementById("displayName").style.borderColor = "red";
          return; // Exit function if displayName is too short
        }
        else if (displayName.length > 25) {
          setError("username must be less than 15 characters.");
          //document.getElementById("displayName").classList.add("input-error");
          //document.getElementById("displayName").style.borderColor = "red";
          return; // Exit function if displayName is too long
        }
        else if (!displayName.match(/^[a-zA-Z\s]+$/)) {
          setError("Full name must contain only letters.");
          return; // Exit function if displayName contains invalid characters
        }
        else if (displayName === "" || password === "" || confirmPassword === "" || email === "") {
          setError("Please fill all fields");
          return; // Exit function if any field is empty
        }

        // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(user, { displayName: displayName })
              .then(() => {
                console.log("User profile updated successfully");
              })
            console.log(user);
            navigate("/")
            window.location.reload();
            console.log("Signed up successfully");
            // ...
        })
        .catch((err) => {
          if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setError("The password is too weak.");
        } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
          setError("The email address is already in use.");
          document.getElementById("email").classList.add("input-error");
          document.getElementById("email").style.borderColor = "red";
        } else if (err.code === AuthErrorCodes.INVALID_EMAIL) {
          setError("The email address is not valid.");
          document.getElementById("email").classList.add("input-error");
          document.getElementById("email").style.borderColor = "red";
        } else {
          console.log(err.code);
          console.log(error)
          alert(err.code);
        }
        });
    };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        padding: '3%',
        maxHeight: '80vh', // Set maximum height to make sure background covers entire viewport
        minHeight: '90vh', // Set minimum height to make sure background covers entire viewport
      }}
    >
      <div
        style={{
            width: '60%',
            maxWidth: '400px',
            height: '100%',
            padding: '20px',
            background: 'white',
            borderRadius: '5px',
            color: 'black',
            textAlign: 'center',
        }}
      >
        <h1>Register</h1>
        <form >
        <br />
          <label htmlFor="displayName"></label>
          <input style={{
             border: '2px solid #6f42c1',
             width: '100%', // Update width to desired size, e.g. '300px'
             padding: '10px', // Add padding for spacing
             borderRadius: '5px', // Add border radius for rounded edges
             fontSize: '20px',
             textTransform: 'capitalize'}}
             type="text"
             id="displayName"
             name="displayName"
             value={displayName}
             onChange={(e) =>setDisplayName(e.target.value)}
             placeholder="Enter full name"
             required
          />
          <br />
          <br />
          <label htmlFor="email"></label>
          <input style={{
             border: '2px solid #6f42c1',
             width: '100%', // Update width to desired size, e.g. '300px'
             padding: '10px', // Add padding for spacing
             borderRadius: '5px', // Add border radius for rounded edges
             fontSize: '20px'}}
             type="email"
             id="email"
             name="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Email address"
             required
          />
          <br />
          <br />
          <label htmlFor="password"></label>
          
          <input style={{
            border: '2px solid #6f42c1',
             width: '100%', // Update width to desired size, e.g. '300px'
             padding: '10px', // Add padding for spacing
             borderRadius: '5px', // Add border radius for rounded edges
             fontSize: '20px'}}
             type="password"
             id="password"
             name="password"
             value={password}
             //onChange={handleChange}
             placeholder="Password"
             onChange={(e) => setPassword(e.target.value)} 
             required
          />
           <br />
          <br />
          <label htmlFor="confirmPassword"></label>
          <input style={{
             border: '2px solid #6f42c1',
             width: '100%', // Update width to desired size, e.g. '300px'
             padding: '10px', // Add padding for spacing
             borderRadius: '5px', // Add border radius for rounded edges
             fontSize: '20px'}}
             type="password"
             id="confirmPassword"
             name="confirmPassword"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             placeholder="Confirm Password"
             required
          />
          <br />
          <br />
          <button  style={{ 
            backgroundColor: '#6f42c1',
            border: '2px solid black',
            color: 'white',
            width: '100%', // Update width to desired size, e.g. '300px'
            padding: '5px', // Add padding for spacing
            fontSize: '25px'}}
            type="submit" 
            onClick={onSubmit}
            >Register</button> 
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
          <FaGoogle style={{ marginRight: '10px' }} />
          Sign up with Google</button>

        <br/>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};
export default Register;