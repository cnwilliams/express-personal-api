console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code

  $.ajax({
    method: 'GET',
    url: '/api/books',
    success: handleSuccess,
    error: handleError
  });

});

function handleSuccess(json) {
  allBooks = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#bookTarget').text('Failed to load books, is the server working?');
}
