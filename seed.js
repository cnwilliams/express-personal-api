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
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/255px-Flag_of_Croatia.svg.png"
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
   countryName: "Italy",
   budgetFriendly: true,
   // gps: {
   //   latitude: Number,
   //   longitude: Number
   // },
   image: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
  }
];



// db.Author.remove({}, function(err, authors) {
//   console.log('removed all authors');
//   db.Author.create(authors_list, function(err, authors){
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('recreated all authors');
//     console.log("created", authors.length, "authors");


//     db.Book.remove({}, function(err, books){
//       console.log('removed all books');
//       books_list.forEach(function (bookData) {
//         var book = new db.Book({
//           title: bookData.title,
//           image: bookData.image,
//           releaseDate: bookData.releaseDate
//         });
//         db.Author.findOne({name: bookData.author}, function (err, foundAuthor) {
//           console.log('found author ' + foundAuthor.name + ' for book ' + book.title);
//           if (err) {
//             console.log(err);
//             return;
//           }
//           book.author = foundAuthor;
//           book.save(function(err, savedBook){
//             if (err) {
//               return console.log(err);
//             }
//             console.log('saved ' + savedBook.title + ' by ' + foundAuthor.name);
//           });
//         });
//       });
//     });

//   });
// });
