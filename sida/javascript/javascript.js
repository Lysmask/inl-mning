(function($) { // Reserverar $-tecknet för jQuery
  $(document).ready(function() { // Kollar att dokumentet är färdigladdat

    //Skapar en koppling till wordpressen för att få åtkomst till rest-api:et.
    //Har olika funktioner för de olika statusarna funktionen kan ha.
    var url = "http://www.inlamning.gloow.se//wp-json/wp/v2/posts/?_embed=true";
    $.ajax({
      type: "GET",
      url: url, // Var wp-informationen ska hämtas från
      timeout: 2000, // Hur länge det ska få försöka ladda innan det ger en timeout.
      beforeSend: function() {
        console.log('before');
      },
      complete: function() {
        console.log('complete');
      },
      success: function(recieveddata) {

        displayWP(recieveddata); //Kallar på funktionen displayWP med datan som vi hämtat som parameter
      },
      error: function() {
        console.log('ERROR');
      }
    });

    function displayWP(pData) {
      console.log(pData);

      //loopar igenom JSON-datan som hämtats från wordpress, för att kunna hämta ut allt
      //innehåll och deklarera de olika värderna i varibaler.
      for (var i = 0; i < pData.length; i++) {

        //Sparar olika data hämtad från wordpress i variabler.
        if (pData[i]._embedded['wp:featuredmedia']) {
          var wpContent = pData[i].content.rendered;
          var wpTitle = pData[i].title.rendered;
          var wpArticle_id = pData[i].id;
          console.log(wpArticle_id);
          var wpBild = pData[i]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
          var frag_json = pData[i]._embedded['wp:featuredmedia'][0];
          var wpCaption = frag_json.caption.rendered;
          var wpFeaturedMediaTitle = frag_json.title.rendered;

          // Deklarerar en variabel för att samla all text i diverse element och för att senare
          // skriva ut det.
          var wpHTML = '';
          var artikel_id = 'section_id_' + wpArticle_id;
          wpHTML += '<section id="' + artikel_id + '">';
          wpHTML += '<h1>' + wpTitle + '</h1>';
          wpHTML += '<figure>' + '<img class="imgSize" src="' + wpBild + '">';
          wpHTML += '</figure>'
          wpHTML += wpContent;
          wpHTML += '</section>'

          // Skriver ut de skapade artiklarna
          $('.content').append(wpHTML);

          // Skapar navigation med länkar till innehåll
          var wpNav = '';
          wpNav += '<li>';
          wpNav += '<a href="#' + artikel_id + '">';
          wpNav += wpTitle;
          wpNav += '</a>' + '</li>'
          // console.log(wpNav);

          // Skriver ut skapad navigation
          $('.mainNav').append(wpNav);

          // Funktion för att scrolla till rätt sektion vid klick på navigation
          // samt active-class på klickad länk
          $('.mainNav a').on('click', function(e) {
            e.preventDefault();
            $('.mainNav a').removeClass('active');
            $(this).addClass('active');
            $('html, body').animate({
              scrollTop: $(this.hash).offset().top
            });
          });

          // Funktion för Hover-effekt på länkar i navigation
          $('.mainNav a').hover(function() {
              $(this).addClass('hover');
            },
            function() {
              $(this).removeClass('hover');
            });


        };
      };
    };



  }); // Slut på document.ready

})(jQuery); // Slut på jquery-reservation