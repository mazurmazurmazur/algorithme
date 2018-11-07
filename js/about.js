$(document).ready(function(){

    $(".aboutSection").hover(function(){
        $(this).children(".glyphicon-menu-down").css("color","gainsboro");
      },
      function(){
        $(this).children(".glyphicon-menu-down").css("color","black");
      });

    $(".aboutSection").click(function () {
   
      

        if ( $(this).find( ".sectionText" ).is( ":hidden" ) ) {
            $( ".sectionText" ).hide( "slow" );
            $(".glyphicon-menu-down").css('transform', 'rotate(' + 0 + 'deg)');
            $(this).find( ".sectionText" ).slideDown( "slow" );
            $(this).children(".glyphicon-menu-down").css('transform', 'rotate(' + 180 + 'deg)');
            
          } 
          else if($(this).find( ".sectionText" ).is( ":visible" )){
            $( ".sectionText" ).hide( "slow" );
            $(this).children(".glyphicon-menu-down").css('transform', 'rotate(' + 0 + 'deg)');

          }
        });

    
});    


