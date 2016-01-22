function addFrame(n) {
  r = `<div class="frame" id="frame${n}">`;
  r +=  `<h3 class="number">Image ${n + 1}</h3>`;
  r +=  '<p class="label">Image Title</p>';
  r +=  '<input type="text" id="titleInput" placeholder="A day at the beach" />';
  r +=  '<p class="label">Image Link</p>';
  r +=  '<input type="text" id="linkInput" placeholder="https://..." />';
  r += '</div>';
  $('.container').append(r);
}

function regen() {
  r = {"title": $('#atitleInput')[0].value, "album": []};
  $($('.frame')).each(function (i, el) {
    if ($(`#frame${i} #linkInput`)[0].value) {
      r.album.push({
        "picSrc": $(`#frame${i} #linkInput`)[0].value,
        "title": $(`#frame${i} #titleInput`)[0].value
      });
    }
  });
  console.debug(r);
  return JSON.stringify(r);
}

$(document).ready(function () {
  addFrame(0);
  $('#addFrame').on('click', function () {
    addFrame($('.frame').length);
  });
  $('#generate').on('click', function () {
    console.debug(btoa(regen()));
    $('.link').html(`<a href="view.html#${btoa(regen())}">Share this link</a>`);
  });
});
