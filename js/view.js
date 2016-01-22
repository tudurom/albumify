function getArg() { return location.hash.slice(1); }

function reload() {
  parsed = JSON.parse(atob(getArg()));
  $('title').text(parsed.title);
  $('#titleText').text(parsed.title);
  $('#descText').text(parsed.description);
  album = parsed.album;
  console.log(atob(getArg()));
  var r = "";
  $(album).each(function (i, el) {
    r += '<div class="pic">';
      r += `<h3 class="title">${el.title}</h3>`;
      r += `<img src="${el.picSrc}"`;
    r += '</div>';
  });
  $('.container').html(r);
}

album = [];

$(document).ready(function () {
  reload();
  $('#remix')[0].href += location.hash;
  $(window).on('hashchange', function () {
    reload();
  });
});
