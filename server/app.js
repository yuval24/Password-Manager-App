const express = require('express');
const app = express();
const cors = require('cors');  
const path = require('path');
const passport = require('passport');

// The port the app will run on
const PORT = 3001;

// gives access to the environment variables
require('dotenv').config();

// connect to the database
require('./config/database');

//models
require('./models/user');
require('./models/vault');

// configure passport - this will run the code in the passport.js file
require('./config/passport')(passport);


// allow the client to send requests to the server 
app.use(cors());

// parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize passport
app.use(passport.initialize());

app.use(require('./routes'));


// The app listening on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});