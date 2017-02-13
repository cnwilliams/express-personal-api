console.log("Sanity Check: JS is working!");

var $destinationsList;
var allDestinations = []

$(document).ready(function(){

// your code

  $.ajax({
    method: "GET",
    url: "/api/destinations",
    data: $(this).serialize(),
    success: handleSuccess,
    error: handleError
  });



  $("#newDestinationForm").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/destinations",
      data: $(this).serialize(),
      success: newDestinationSuccess,
      error: newDestinationError
    });
  });

    // $booksList.on('click', '.deleteBtn', function() {
  //   $.ajax({
  //     method: 'DELETE',
  //     url: '/api/books/'+$(this).attr('data-id'),
  //     success: deleteBookSuccess,
  //     error: deleteBookError
  //   });
  // });

});



function getDestinationHtml(destination) {
  return `<hr>
          <p>
            <b>${"destination.countryName"}</b>
            <br>
            // <b>Characters:</b>
            // ${getAllCharactersHtml(book.id, book.characters)}
            // <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${destination._id}>Delete</button>
          </p>
          // <form class="form-inline" id="addCharacterForm" data-id=${book._id}>
          //   <div class="form-group">
          //     <input type="text" class="form-control" name="name" placeholder="Book character">
          //   </div>
          //   <button type="submit" class="btn btn-default">Add character</button>
          </form>
          `;
}

function getAllDestinationsHtml(destinations) {
  return destinations.map(getDestinationHtml).join("");
}


// function handleSuccess(json) {
//   allDestinations = json;
//   console.log(allDestinations);
// }


function render () {
  // empty existing posts from view
  $destinationsList.empty();

  // pass `allBooks` into the template function
  var destinationsHtml = getAllDestinationsHtml(allDestinations);

  // append html to the view
  $destinationsList.append(destinationsHtml);
};

  function handleSuccess(json) {

    for (var i = 0; i < json.length; i++){
      $("#destinationTarget").append(`
        <img class="col-md-3" src= ${json[i].image}  >`);
    // console.log(destination_list);
    console.log("Successfully responded with destinations: " + json);
    }
    allDestinations = json;
  }

function handleError(e) {
  console.log("uh oh");
  $('#destinationTarget').text("Failed to load destinations, is the server working?");
}

function newDestinationSuccess(json) {
  $('#newDestinationForm input').val('');
  allDestinations.push(json);
  render();
}

function newDestinationError() {
  console.log("new destination error!");
}

// function deleteBookSuccess(json) {
//   var book = json;
//   var bookId = book._id;
