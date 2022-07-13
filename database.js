const mongoose = require("mongoose");

exports.connect = () => {
    // Connecting to the database
    mongoose.connect('mongodb://127.0.0.1:27017/samcom').then(() => {
        console.log("Successfully connected to database");
    }).catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
};