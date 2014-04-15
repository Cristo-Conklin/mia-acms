/*
El php en el archivo index, acms.php ajax.js y mia.js son scripts creados por requiemsoft.com.
No se permite la redistribución ni el plagio de código. 
Para cualquier duda consúltanos.
*/

function loadXMLDoc(page)
{
	
	var desired_delay = 1000;
	var message_timer = false;

	var request = $.ajax({
			  			url: 'index.php?ajax=true&page='+page,
			  			cache: false
					});

    message_timer = setTimeout(function () {
	        $("#loader").show();
	            message_timer = false;
	    }, desired_delay);

    request.done(function(xml) {
        if (message_timer)
            clearTimeout(message_timer);
        message_timer = false;
        
        //----------Page specifics
	    document.getElementById("ajax").innerHTML = xml;  
	    
	    $("#loader").hide(400);
	    
	    makeItAjax(); 

    	history.pushState(null, page + " title", page);
    	//---------  	
    });

    request.fail(function( jqXHR, textStatus ) {
	  alert( "Error loading contents: " + textStatus );
	});

	return false;
}