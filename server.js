// require express and other modules
var express = require('express');
var app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get("/api", function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/cnwilliams/express-personal-api/README.rd",
    baseUrl: "https://shrouded-falls-45449.herokuapp.com/",
    currentCity: "San Francisco",
    // isAwake: boolean,
    // favoriteIceCreamFlavor: "Mint Chocolate Chip",
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Data about me"
      },
      {
        method: "GET",
        path: "/api/destinations",
        description: "Existing destinations in database"
      },
      {
        method: "GET",
        path: "/api/destinations/:destinationId",
        description: "Finds destination by id"
      },
      {
        method: "POST",
        path: "/api/destinations",
        description: "Creates a new destination entry"
      },
      {
        method: "PUT",
        path: "/api/destinations/:id",
        description: "Edit a previous destination entry and update it"
      },
      {
        method: "DELETE",
        path: "/api/destinations/:id",
        description: "Destroy an entry"
      },
    ]
  });
});




/**********
 * SERVER *
 **********/

 // get all destinations
 app.get('/api/destinations', function apiAllDestinations(req, res) {
   db.Destination.find({})
     // .populate() // ONLY USE FOR REFERENCE DATA
     .exec( function(err, destinations){
       if (err) {
         res.status(500).send(err);
         return;
       }
      // console.log(destinations);
      res.json(destinations);
     });
  });

 app.get('/api/destinations/:id', function apiDestinationById(req, res) {
  console.log(req.params)
   // find one book by its id
   var destinationId = req.params.id;
    db.Destination.find({_id: destinationId}, function (err, theDestination){
    if (err) { console.log("Error: " + err); }
   // })
   //   // populate the author
   //   // .populate('author')
   //   .exec(function(err, destinations){
   //     if (err) {
   //       res.status(500).send(err);
   //       return;
   //     }
       res.json(theDestination);
     });
 });


// app.get('/api/destinations/:id', function (req, res) {
//   // find one book by its id
//   console.log('destinations show', req.params);
//   for(var i=0; i < destination.length; i++) {
//     if (destination[i]._id === req.params.id) {
//       res.json(destination[i]);
//       break; // we found the right book, we can stop searching
//     }
//   }
// });




// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
