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
    pets: [
      {name: "Peeps", type: "Cat", breed: "Feral"}, {name: "Cocoa", type: "Dog", breed: "Pomeranian"}
      ],

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
        path: "/api/destinations/:id",
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
app.get('/api/destinations', function destinationIndex(req, res) {
  db.Destination.find({})
    .exec( function(err, destinations){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(destinations);
    });
});

// find one destination by its id
app.get("/api/destinations/:id", function destinationShow(req, res) {
  var destinationId = req.params.id;
  console.log(destinationId);
  db.Destination.find({_id: destinationId}, function (err, theDestination){
  if (err) { console.log("Error: " + err); }
  res.json(theDestination);
  });
});

// create new destination
app.post("/api/destinations", function newDestinationCreate(req, res) {
  var newDestination = new db.Destination({
    countryName: req.body.countryName,
    budgetFriendly: req.body.budgetFriendly,
    image: req.body.image
  });

  newDestination.save(function(err, destination){
    if (err) {
      return console.log("There was a save error: " + err);
    }
    console.log("Saved ", destination.countryName);
    res.json(destination.countryName)
  })
})


// app.post("/api/destinations", function destinationCreate(req, res) {
//   var destinationRecommendation = req.body;
//   db.Destination.create(destinationRecommendation, function(err, newDestinationRecommendation) {
//     if (err) { console.log(err); }
//     res.send(newDestinationRecommendation)
//   });
// });



// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Express server is up and running on http://localhost:3000/");
});
