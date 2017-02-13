console.log("Sanity Check: JS is working!");

var $destinationsList;
var allDestinations = []

$(document).ready(function(){

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

  $destinationsList.on("click", ".deleteBtn", function() {
    $.ajax({
      method: "DELETE",
      url: "/api/destinations/" + $(this).attr("data-id"),
      success: deleteDestinationSuccess,
      error: deleteDestinationError
    });
  });
});



function render() {
  $destinationsList.empty();
  $destinationsList.append(`
    <br>
    <hr>
    <p>
      <br>
      <h3><b>Country:</b>
      ${json.countryName} </h3>
      <img class="img-responsive center-block" src="/images/world-map1-small">
      <br>
      <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${json._id}>x</button>
    </p>
  `);
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
  }
  allDestinations = json;
}

function handleError(e) {
  $("#destinationTarget").text("Failed to load destinations, is the server working?");
}

function newDestinationSuccess(json) {
  var $newDestination = $("input.form-control").val("");
  allDestinations.push($newDestination);
  render();
}

function newDestinationError() {
  console.log("new destination error!");
}

// Needs work...
function deleteDestinationSuccess(json) {
  var destination = json;
  var destinationId = json[index]._id;
  for(var index = 0; index < allDestinations.length; index++) {
    if(allDestinations[index]._id === destinationId) {
        allDestinations.splice(index, 1);
        break;
      }
    }
    render();
  }

  function deleteDestinationError() {
  console.log("Destination deleting error!");
}