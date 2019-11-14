

function getAllPaintings() {
  fetch("http://dashboard.algorithme.co/wp-json/wp/v2/about?_embed&per_page=100")
    .then(res => res.json())
    .then(showPaintings)
   
    
    
}

function showPaintings(data) {
    let pastText = document.getElementById("pastText");
    let presentText = document.getElementById("presentText");
    let futureText = document.getElementById("futureText");
    console.log(data);  
    let past = data["0"].acf.past;
    let present = data["0"].acf.present;
    let future = data["0"].acf.future;

     data.forEach(function(thePainting) {
      let pastArray = Object.values(past);
      let presentArray = Object.values(present);
      let futureArray = Object.values(future);

      
      for(let i = 0; i<pastArray.length;i++){
        if(pastArray[i]!==""){
          let newP = document.createElement("p");
          newP.innerHTML="#"+ pastArray[i]+"<br><br>";
          pastText.appendChild(newP);
        }
      }

      for(let i = 0; i<presentArray.length;i++){
        if(presentArray[i]!==""){
          let newP = document.createElement("p");
          newP.innerHTML="#"+ presentArray[i]+"<br><br>";
          presentText.appendChild(newP);
        }
      }

      for(let i = 0; i<futureArray.length;i++){
        if(futureArray[i]!==""){
          let newP = document.createElement("p");
          newP.innerHTML="#"+ futureArray[i]+"<br><br>";
          futureText.appendChild(newP);
        }
      }
      

     })
  }

getAllPaintings();





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

        setTimeout(function(){$("#presentText").trigger("click")}, 500);

    
});    




