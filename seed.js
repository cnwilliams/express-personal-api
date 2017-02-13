// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var destination_list = [
  {
  countryName: "Croatia",
  budgetFriendly: false,
  // gps: {
  //   latitude: Number,
  //   longitude: Number
  // },
  image: "images/croatia-dubrovnik.jpg"
  },
  {
   countryName: "Spain",
   budgetFriendly: true,
   // gps: {
   //   latitude: Number,
   //   longitude: Number
   // },
   image: "#"
  },
  {
   countryName: "China",
   budgetFriendly: true,
   // gps: {
   //   latitude: Number,
   //   longitude: Number
   // },
   image: "#"
  },
  {
   countryName: "Mexico",
   budgetFriendly: true,
   // gps: {
   //   latitude: Number,
   //   longitude: Number
   // },
   image: "#"
  }
];

db.Destination.remove({}, function(err){
  if (err) {console.log("Error: ", err);}
  else {console.log("Emptied the database");}

  db.Destination.create(destination_list, function(err, destinations) {
    if (err) {console.log("Error: ", err);}
    console.log("created", destination_list.length, "desintations");
    process.exit();
  });
});
