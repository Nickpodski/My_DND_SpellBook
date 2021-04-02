var numberOfPages = 1000;
const addSpellBtn = $('.add-btn');

// addSpellBtn.on("click", addSpellButton());

function addSpellButton(spell) {
    const spellID = JSON.stringify(spell);
    const url = '/api/spellbooks/add/' + spellID;
    axios.put(url,)
      .then(function (res) {
        console.log(res);
        return;
      })
      .catch(function (err) {
          console.log(err);
          return;
      });
    return;
  }

//  Side nav
$(document).ready(function(){
    $('.sidenav').sidenav();
 
//   $('.sidenav').sidenav('side', left);
    // Adds the pages that the book will need
    function addPage(page, book) {
        // 	First check if the page is already in the book
        if (!book.turn('hasPage', page)) {
            // Create an element for this page
            var element = $('<div />', {'class': 'page '+((page%2==0) ? 'odd' : 'even'), 'id': 'page-'+page}).html('<i class="loader"></i>');
            // If not then add the page
            book.turn('addPage', element, page);
            // Let's assum that the data is comming from the server and the request takes 1s.
            setTimeout(function(){
                    // element.html('<div class="p2">Login here</div>');
            }, 1000);
        }
    }

    $(window).ready(function(){
        $('#book').turn({acceleration: true,
                            pages: numberOfPages,
                            elevation: 50,
                            gradients: !$.isTouch,
                            when: {
                                turning: function(e, page, view) {

                                    // Gets the range of pages that the book needs right now
                                    var range = $(this).turn('range', page);

                                    // Check if each page is within the book
                                    for (page = range[0]; page<=range[1]; page++) 
                                        addPage(page, $(this));

                                },

                                turned: function(e, page) {
                                    $('#page-number').val(page);
                                }
                            }
                        });

        $('#number-pages').html(numberOfPages);

        $('#page-number').keydown(function(e){

            if (e.keyCode==13)
                $('#book').turn('page', $('#page-number').val());
                
        });
    });

    $(window).bind('keydown', function(e){

        if (e.target && e.target.tagName.toLowerCase()!='input')
            if (e.keyCode==37)
                $('#book').turn('previous');
            else if (e.keyCode==39)
                $('#book').turn('next');
                //                     ^ add .turn('next') -- to turn 2 pages

    });
    
});

//     $(window).width(function(){
//   var win = $(this); //this = window
//   if (win.width() >= 820) { book.turn('display','double');}
//   else {
//     book.turn('display','single');
//   }
// });
// $(window).resize(function(){
// var win = $(this); //this = window
// if (win.width() >= 820) { book.turn('display','double');}
// else {
//   book.turn('display','single');
// }
// });  

    // $('#book').click(function() {
    //     $('body').css("backdrop-filter", "blur(8px)");
    // });
   
