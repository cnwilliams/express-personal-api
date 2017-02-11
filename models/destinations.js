var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DestinationSchema = new Schema({
  country: String,
  budgetFriendly: Boolean
  // gps: {
  //   latitude: Number,
  //   longitude: Number
  // },
  image: String
});

var Destination = mongoose.model('Destination', DestinationSchema);

module.exports = Destination;
