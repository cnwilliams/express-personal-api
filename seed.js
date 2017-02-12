// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var DestinationSchema = new Schema({
  country: String,
  budgetFriendly: Boolean
  // gps: {
  //   latitude: Number,
  //   longitude: Number
  // },
  image: String
});

var destination_list = {
  country: "Croatia",
  budgetFriendly: false,
  // gps: {
  //   latitude: Number,
  //   longitude: Number
  // },
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/255px-Flag_of_Croatia.svg.png"
  },
  {
   country: "China",
   budgetFriendly: true,
   // gps: {
   //   latitude: Number,
   //   longitude: Number
   // },
   image: "#"
  },
  {
   country: "Italy",
   budgetFriendly: true,
   // gps: {
   //   latitude: Number,
   //   longitude: Number
   // },
   image: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
  }
);


// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
