// Import the functions you need from the SDKs you need
import bodyParser from 'body-parser';
import { initializeApp } from "firebase/app";
import axios from 'axios';
import express from 'express';
import https from 'https';
import { getAnalytics } from "firebase/analytics";
import {MongoClient, ServerApiVersion} from 'mongodb';

// MongoDB connection string
const uri = "mongodb+srv://Group17:Group17@group17.bkwstk3.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Connect to MongoDB
client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("Connected to MongoDB");
  }
});

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhATsFvu-Z-SODDRPn1ZeY4DdApnNxaRE",
  authDomain: "final-project-group17-b8a6e.firebaseapp.com",
  projectId: "final-project-group17-b8a6e",
  storageBucket: "final-project-group17-b8a6e.appspot.com",
  messagingSenderId: "66144001776",
  appId: "1:66144001776:web:094c2bfee00ff7450aec35",
  measurementId: "G-M9ZKBPPEB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create Express application instance
const expressApp = express();
expressApp.use(bodyParser.json());

// Set headers for CORS
expressApp.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  
  });

// Get all popular movies
expressApp.get('/popular', async (req, res) => {
    try {
        // Fetch popular movies from the API
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=d831e6240e4bf95194c9d255b9ec34c2&language=en-US&page=3"
        , {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODMxZTYyNDBlNGJmOTUxOTRjOWQyNTViOWVjMzRjMiIsInN1YiI6IjY0M2M1MGFhMzFkMDliMDUxYzFjYWJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ioBOj1MDDSY34nnvxoqvZmwTt-ogGXF4Vz1fRkZV138'
            }
        });

        // Send the movies in the response
        const movies = response.data.results;
        res.send(movies);
        console.log('\n'); // New line for readability
        console.log('Sent list of popular movies');
        
        // Log the titles of all movies
        movies.forEach(movie => {
            console.log(movie.title);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movies');
    }
});

// Get TopRated movies
expressApp.get('/toprated', async (req, res) => {
    try {
        // Fetch movie details from the API
        const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=d831e6240e4bf95194c9d255b9ec34c2&language=en-US&page=3"
        , {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODMxZTYyNDBlNGJmOTUxOTRjOWQyNTViOWVjMzRjMiIsInN1YiI6IjY0M2M1MGFhMzFkMDliMDUxYzFjYWJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ioBOj1MDDSY34nnvxoqvZmwTt-ogGXF4Vz1fRkZV138'
            }
        });

        // Send the movie details in the response
        const movies = response.data.results;
        res.send(movies);
        console.log('\n'); // New line for readability
        console.log('Sent list of toprated movies');
        
        // Log the titles of all movies
        movies.forEach(movie => {
            console.log(movie.title);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movies');
    }
});

// Search movies
expressApp.get('/search/:searchQuery', async (req, res) => {
    const searchQuery = req.params.searchQuery;
    try {
        //const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=d831e6240e4bf95194c9d255b9ec34c2&language=en-US&page=3"

        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d831e6240e4bf95194c9d255b9ec34&query=${searchQuery}`
        , {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODMxZTYyNDBlNGJmOTUxOTRjOWQyNTViOWVjMzRjMiIsInN1YiI6IjY0M2M1MGFhMzFkMDliMDUxYzFjYWJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ioBOj1MDDSY34nnvxoqvZmwTt-ogGXF4Vz1fRkZV138'
            }
        });

        const movies = response.data.results;
        res.send(movies);
        console.log('\n'); // New line for readability
        console.log('Movies found:');
        
        // Log the titles of all movies
        movies.forEach(movie => {
            console.log(movie.title);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movies');
    }
});

// Get Upcoming movies
expressApp.get('/upcoming', async (req, res) => {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=d831e6240e4bf95194c9d255b9ec34c2&language=en-US&page=3"
        , {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODMxZTYyNDBlNGJmOTUxOTRjOWQyNTViOWVjMzRjMiIsInN1YiI6IjY0M2M1MGFhMzFkMDliMDUxYzFjYWJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ioBOj1MDDSY34nnvxoqvZmwTt-ogGXF4Vz1fRkZV138'
            }
        });

        const movies = response.data.results;
        res.send(movies);
        console.log('\n'); // New line for readability
        console.log('Sent list of upcoming movies');
        
        // Log the titles of all movies
        movies.forEach(movie => {
            console.log(movie.title);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movies');
    }
});


// Get NowPlaying movies
expressApp.get('/nowplaying', async (req, res) => {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=d831e6240e4bf95194c9d255b9ec34c2&language=en-US&page=3"
        , {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODMxZTYyNDBlNGJmOTUxOTRjOWQyNTViOWVjMzRjMiIsInN1YiI6IjY0M2M1MGFhMzFkMDliMDUxYzFjYWJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ioBOj1MDDSY34nnvxoqvZmwTt-ogGXF4Vz1fRkZV138'
            }
        });

        const movies = response.data.results;
        res.send(movies);
        console.log('\n'); // New line for readability
        console.log('Sent list of nowplaying movies');
        
        // Log the titles of all movies
        movies.forEach(movie => {
            console.log(movie.title);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movies');
    }
});

//Get favorite movies
expressApp.get('/movies/:userId', async function(req, res) {
  // Connect to the MongoDB database
  await client.connect();
  const db = client.db('movieServer');
  const collection = db.collection('Favorites');

  // Check if the search term is a number
  const searchUserId = req.params.userId;
  //const searchDisplayName = req.params.displayName;
  const isNumber = /^\d+$/.test(searchUserId);
  // Create the query object based on the search term
  let query;
  if (isNumber) {
    query = {
      $or: [
        { userId: { $regex: searchUserId, $options: 'i' } },
      ]
    };
  } else {
    query = {
      $or: [
        { userId: { $regex: searchUserId, $options: 'i' } },
      ]
    };
  }
  // Search the database using the query object
  const movies = await collection.find(query).toArray();

  // Close the MongoDB client
  await client.close();

  // Return the response
  if (movies) {
    console.log("\nMovies found");
    console.log(`Found ${movies.length} movies with userId ${searchUserId}`);
    console.log(movies);
    return res.status(200).send(movies);
  } else {
    console.log(`No movies found with name ${searchUserId}`);
    //console.log (`No movies found with name ${searchDisplayName}`) 
    return res.status(404).send({"message":"error - No movie found"});
  }
});

//Delete favorite movies
expressApp.delete('/movies/:_id', async function(req, res) {
  const _id = parseInt(req.params._id);

  // Connect to the MongoDB database
  await client.connect();
  const db = client.db('movieServer');
  const collection = db.collection('Favorites');
  
  // Delete the document from the collection
  const result = await collection.deleteOne({_id: _id});

  // Close the MongoDB client
  await client.close();

  // Return the response
  const rsp_obj = {};
  if (result.deletedCount === 1) {
    rsp_obj.message = 'Movie successfully deleted';
    console.log('\nMovie Successfully deleted')
    //console.log (rsp_obj);
    return res.status(200).send(rsp_obj);
  } else {
    rsp_obj.message = 'error - unable to delete resource';
    return res.status(404).send(rsp_obj);
  }
});


//Get all movies from the database
expressApp.get('/movies', async function (req, res) {
    await client.connect();
    try {
        const db = client.db('movieServer');
        const collection = db.collection('Favorites');
        
        const movies = await collection.find({}).toArray(); // find all movies with the given userId
        console.log(`Found ${movies.length} movies`);
        console.log(movies);  

        // Return the response
        return res.status(200).send(movies);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
    close = client.close();
});

// Add movie to favorites
expressApp.post('/movies/:add',async function(req, res) {
    // Access the movie data sent in the request body
    const movie = req.body;

     await client.connect();
     const db = client.db('movieServer');
     const collection = db.collection('Favorites');
     console.log("\n")
     console.log("movie: ", movie);

     // Check if the movie already exists in the database
    const matching_movie = await collection.findOne({ title: movie.title, userId: movie.userId});
    console.log("matching_movie: ", matching_movie);
    if (matching_movie) {
        // Update the existing movie document
        const result = await collection.updateOne({ id: matching_movie.id, _id: movie._id }, { $set: movie });
        const rsp_obj = { id: matching_movie.id, message: 'successfully updated' };
        console.log("Movie already exists");
        return res.status(200).send(rsp_obj);
    } else {
        // Insert the new movie document
        const result = await collection.insertOne(movie);
        const rsp_obj = {};
        if (result.insertedId === movie.id) {
            rsp_obj.id = movie.id;
            rsp_obj.message = 'successfully created';
            console.log("Successfully added movie");
            return res.status(200).send(rsp_obj);
        } else {
            rsp_obj._id = -1;
            rsp_obj.message = 'error - unable to add movie';
            return res.status(201).send(rsp_obj);
        }
    }

    // Close the connection to the database server
    await client.close();
});

//start the server

var port = process.env.PORT || 5678;
var listener = expressApp.listen(port); //start the server
console.log('Server is running...\n');
