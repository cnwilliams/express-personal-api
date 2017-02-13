var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Destination = require("./destination.js");
