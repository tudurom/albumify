function addFrame(n) {
  r = `<div class="frame" id="frame${n}">`;
  r +=  `<p>${n + 1}.</p>`;
  r +=  '<input type="text" id="linkInput" placeholder="Link: http://..." />';
  r +=  '<input type="text" id="titleInput" placeholder="Title: a day at the beach" />';
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
