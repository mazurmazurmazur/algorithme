$(document).ready(function(){
    $('.aboutSection').hover(function(){  
        $(this).children('span.glyphicon').css({'visibility' : 'visible'});
    },function(){  
        $(this).children('span.glyphicon').css({'visibility' : 'hidden'});
    });

    $(".aboutSection").click(function () {
   

        if ( $(this).find( ".sectionText" ).is( ":hidden" ) ) {
            $( ".sectionText" ).hide( "slow" );
            $(this).find( ".sectionText" ).slideDown( "slow" );
            
          } 
        });

    
});    


