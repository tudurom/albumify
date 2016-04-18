frames = 0;

function addFrame(n, defaultLink, defaultTitle) {
  defaultLink = defaultLink || "";
  defaultTitle = defaultTitle || "";
  frames++;
  r = '<div class="frame" id="frame' + n + '">';
  r +=  '<h3 class="number">Image ' + (n + 1) + '</h3>';
  r +=  '<p class="label">Image Title</p>';
  r +=  '<input type="text" id="titleInput" placeholder="A day at the beach" value="' + defaultTitle + '"/>';
  r +=  '<p class="label">Image Link</p>';
  r +=  '<input type="text" id="linkInput" placeholder="https://..." value="' + defaultLink + '" />';
  r +=  '<button id="deleteFrame">Delete image</button>';
  r += '</div>';
  $('.container').append(r);
  updateNumbers();
  $('#frame' + n + ' #deleteFrame').on('click', function () {
    $(this.parentNode).remove();
    updateNumbers();
  });
}

function updateNumbers() {
  $('.number').each(function (i, el) {
    if (i > 0) { // Skip over the "Album" text
      el.innerHTML = 'Image ' + i;
    }
  });
}

function regen() {
  r = {"title": $('#atitleInput')[0].value, "description": $('#adescInput')[0].value,"album": []};
  $('.frame').each(function (i, el) {
    var linkField, titleField;
    var deleteBtn;
    var counter = 0;
    // This should be made as a function
    while (counter < el.childNodes.length && el.childNodes[counter].id != "linkInput")
      counter++; // It's guaranteed we find one
    linkField = el.childNodes[counter];
    counter = 0;
    while (counter < el.childNodes.length && el.childNodes[counter].id != "titleInput")
      counter++; // It's guaranteed we find one
    titleField = el.childNodes[counter];

    if (linkInput.value) {
      r.album.push({
        "picSrc": linkField.value,
        "title": titleField.value
      });
    }
  });
  console.debug(r);
  return JSON.stringify(r);
}

function updateFromHash() {
  $('.frame').remove();
  var parsed = JSON.parse(atob(location.hash.slice(1)));
  var title = parsed.title;
  var desc = parsed.description;
  var album = parsed.album;
  $('#atitleInput')[0].value = title;
  $('#adescInput')[0].value = desc || "";
  album.forEach(function (frame) {
    addFrame(frames, frame.picSrc, frame.title);
  });
}

$(document).ready(function () {
  addFrame(frames);
  $('#addFrame').on('click', function () {
    addFrame(frames);
  });
  $('form').on('submit', function (e) {
    e.preventDefault();
    console.debug(btoa(regen()));
    $('.link').html('<a href="view.html#' + btoa(regen()) + '">' + window.location.href + 'view.html#' + btoa(regen()) + '</a>');
  });
  $(window).on('hashchange', updateFromHash);
  if (location.hash.slice(1) !== "") {
    updateFromHash();
  }
});
