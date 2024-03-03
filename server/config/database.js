const mongoose = require('mongoose');

require('dotenv').config();

const devConneciton = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

// checks if the app is on production or development and sets the connection string accordingly
if(process.env.NODE_ENV === 'production'){
    mongoose.connect(prodConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to the database');
    });
} else {
    mongoose.connect(devConneciton, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to the database');
    });
}