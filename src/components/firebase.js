/**
 * @fileoverview Firebase configuration and initialization for the application.
 */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * @constant
 * @type {Object}
 * @description Your web app's Firebase configuration object containing the necessary API keys and project details.
 */
const firebaseConfig = {
    apiKey: "AIzaSyAhATsFvu-Z-SODDRPn1ZeY4DdApnNxaRE",
    authDomain: "final-project-group17-b8a6e.firebaseapp.com",
    databaseURL: "https://final-project-group17-b8a6e-default-rtdb.firebaseio.com",
    projectId: "final-project-group17-b8a6e",
    storageBucket: "final-project-group17-b8a6e.appspot.com",
    messagingSenderId: "66144001776",
    appId: "1:66144001776:web:094c2bfee00ff7450aec35",
    measurementId: "G-M9ZKBPPEB6"
};
 
/**
 * @constant
 * @type {Object}
 * @description The initialized Firebase application instance.
 */
// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * @constant
 * @type {Object}
 * @description The initialized Firebase Authentication instance.
 */
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

/**
 * @constant
 * @type {Object}
 * @description The initialized Firebase application instance.
 */
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);