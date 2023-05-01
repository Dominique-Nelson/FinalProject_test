/**
 * Imports necessary functions and objects from the Firebase authentication library
 */
import {GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { auth } from './firebase';

/**
 * Creates a new GoogleAuthProvider instance
 * @type {GoogleAuthProvider}
 */
const provider = new GoogleAuthProvider();

/**
 * Handles the Google login process using Firebase authentication
 * @async
 * @function
 */
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

/**
 * Exports the handleGoogleLogin function
 * @type {function}
 */
  export default handleGoogleLogin;