/* jshint esversion: 6 */
/* jshint devel: true */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */

'use strict';

$(function() {
  $('#search').focus();

  $('#search-btn').on('click', main);

  $('#search').on('keyup', (event) => {
    if (event.keyCode === '13') main();
  });

  $('#delete').on('click', () => {
    $('main').children().remove();
  });
});

// main
function main() {
  let searchTerm = getSearchTerm();
  if (searchTerm) appendGif(searchTerm);
}

// gets the search term entered into the search field, clears it, and restores focus
function getSearchTerm() {
  let searchTerm = $('#search').val();
  $('#search').val('');
  $('#search').focus();
  return searchTerm;
}

// creates and appends div holding the gif to the page
function appendGif(searchTerm) {
  let $newDiv = $('<div>');
  $newDiv.addClass('gif');

  let $newImg = $('<img>');
  $newImg.addClass('img-responsive');
  $newDiv.append($newImg);

  $('main').prepend($newDiv);
  getUrl($newImg, searchTerm);
}

// performs ajax request to get url and adds it as a src attribute to the img tag
// also changes the provided image url protocol from http to https 
function getUrl($newImg, searchTerm) {
  $.get(`https://api.giphy.com/v1/gifs/random?tag=${searchTerm}&api_key=b52d2be9600f49be88b103842725d63f&limit=1`)
    .done((result) => {
      let httpsUrl = 'https:' + result.data.image_url.split(':')[1];
      $newImg.attr('src', httpsUrl);
    })
    .catch((error) => {
      console.log("something went wrong", error);
    });
}
