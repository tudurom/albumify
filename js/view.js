function getArg() { return location.hash.slice(1); }

function reload() {
  parsed = JSON.parse(atob(getArg()));
  if (parsed.title) {
    $('title').text(parsed.title + ' | Album-ify!');
    $('#titleText').text(parsed.title);
  } else {
    $('title').text('Album-ify!');
    $('#titleHr').hide();
  }
  $('#descText').html(marked(parsed.description));
  album = parsed.album;
  console.log(atob(getArg()));
  var r = "";
  album.forEach(function (el, i) {
    r += '<div class="pic">';
      r += '<h3 class="title">' + el.title + '</h3>';
      if (el.picSrc.endsWith(".webm")) {
        r += '<video controls>'
          r += '<source src="' + el.picSrc + '" type="video/webm">'
        r += '</video>'
      } else {
        r += '<a href="' + el.picSrc + '"><img src="' + el.picSrc + '" /></a>';
      }
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
