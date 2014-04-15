$(document).ready(function(){
  $(".nav li").click(function(event){

		$(".nav li").removeClass("active");		
	
		$(this).addClass("active");
	
  });
  
});