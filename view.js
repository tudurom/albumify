function getArg() { return location.hash.slice(1); }

function reload() {
  parsed = JSON.parse(atob(getArg()));
  $('title').text(parsed.title);
  album = parsed.album;
  console.log(atob(getArg()));
  var r = "";
  $(album).each(function (i, el) {
    r += '<div class="pic">';
      r += `<img src="${el.picSrc}"`;
      r += `<div class="title">${el.title}</div>`;
    r += '</div>';
  });
  $('.container').html(r);
}

album = [];

$(document).ready(function () {
  reload();
  $(window).on('hashchange', function () {
    reload();
  });
});
