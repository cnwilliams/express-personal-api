console.log("Sanity Check: JS is working!");

var $destinationList
var allDestinations = []

$(document).ready(function(){

// your code

  $.ajax({
    method: "GET",
    url: "/api/destinations",
    data: $("form").serialize(),
    success: handleSuccess,
    error: handleError
  });

});

function newDestinationSuccess(json) {
  $('#newDestinationForm input').val('');
  allDestinations.push(json);
  render();
}

function handleSuccess(json) {
  allDestinations = json;
  console.log(allDestinations);
}

function handleError(e) {
  console.log("uh oh");
  $('#destinationTarget').text("Failed to load books, is the server working?");
}
