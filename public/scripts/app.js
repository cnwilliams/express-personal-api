console.log("Sanity Check: JS is working!");

var $destinationsList;
var allDestinations = []

$(document).ready(function(){

// your code
  $destinationsList = $(".destinationTarget")

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

  //   $booksList.on("click", ".deleteBtn", function() {
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/books/" + $(this).attr("data-id"),
  //     success: deleteBookSuccess,
  //     error: deleteBookError
  //   });
  // });

});



function getDestinationHtml(destination) {
  return `<hr>
          <p>
            <br>
            <b>Country:</b>
            ${destination.countryName}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${destination._id}>Delete</button>
          </p>
          <form class="form-inline" id="addDestinationForm" data-id=${destination._id}>
            <div class="form-group">
              <input type="text" class="form-control" name="name" placeholder="Have any tips?">
            </div>
            <button type="submit" class="btn btn-default">Share</button>
          </form>
          `;
}

function getAllDestinationsHtml(destinations) {
  return destinations.map(getDestinationHtml).join("");
}


function handleSuccess(json) {
  allDestinations = json;
  console.log(allDestinations);
}


function render() {
  // empty existing posts from view
  $destinationsList.empty();

  // pass `allBooks` into the template function
  var destinationsHtml = getAllDestinationsHtml(allDestinations);

  // append html to the view
  $destinationsList.append(destinationsHtml);
};

  function handleSuccess(json) {

    for (var i = 0; i < json.length; i++){
      $(".destinationTarget").append(`
        <br>
        <hr>
        <p>
          <br>
          <h3><b>Country:</b>
          ${json[i].countryName} </h3>
          <img class="img-responsive center-block" src= ${json[i].image}>
          <br>
          <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${json[i]._id}>x</button>
        </p>

        `);
    // console.log(destination_list);
    // <hr>
    // <p>
    //   <br>
    //   <b>Country:</b>
    //   ${json[i].countryName}
    //   <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${json[i]._id}>Delete</button>
    // </p>
    // <form class="form-inline" id="addDestinationForm" data-id=${destination._id}>
    //   <div class="form-group">
    //     <input type="text" class="form-control" name="name" placeholder="Have any tips?">
    //   </div>
    //   <button type="submit" class="btn btn-default">Share</button>
    // </form>
    // `);
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
