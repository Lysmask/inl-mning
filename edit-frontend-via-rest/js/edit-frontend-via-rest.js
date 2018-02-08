(function($) {

  // root till REST
  // id till posts
  // nonce-värde


  console.log('WPsettings.root', WPsettings.root)
  console.log('WPsettings.nonce', WPsettings.nonce)
  console.log('WPsettings.ID', WPsettings.current_ID)

  // Gör en variabel för entry-title-classen.
  var $entryTitle = $('.entry-title');

  // För in en knapp för editing.
  $entryTitle.after('<button class="editButton editTitle"> Edit Title </button> <button class="editTitle Save" style="display:none"> Save </button>');

  // Kör igång en ajax-funktion som gör det möjligt att för att göra en post.
  function runAjax(newTitle) {
    $.ajax({
      url: WPsettings.root + 'wp/v2/posts/' + WPsettings.current_ID,
      method: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', WPsettings.nonce)
      },
      data: {
        'title': newTitle
      }
    })
  }

  // Skapar en knapp med funktion för att redigera titeln direkt i dokumentet.
  $('.editTitle.editButton').on('click', function() {
    var $originalTitle = $('.entry-title').text();
    $entryTitle.toggle();
    $entryTitle.after('<input id="title-input" type="text">');
    $('#title-input').val($originalTitle);
    $(this).toggle();
    $('.editTitle.Save').toggle();
  });

  // Sparar innehållet och ändrar tillbaka "Sparaknappen" till "Edit".
  $('.Save').on('click', function() {
    var newTitle = $('#title-input').val();
    $entryTitle.text(newTitle);
    $entryTitle.toggle();
    $('#title-input').toggle();
    $('.editTitle.editButton').toggle();
    $(this).toggle();
    runAjax(newTitle);
  });

  // WPsettings.root
  // WPsettings.nonce
  // WPsettings.current_ID


})(jQuery)