	var a = [];
	var exceptions = ['404'];

	function getPages(){
	    return $.getJSON('acms/pages.js');
	}
		getPages().done(function(pages) {
		    a = [];
		    $.each(pages, function(key, val) {
				if (exceptions.indexOf(key)>=0) {
					a.pop(a);
				} else
					a.push(key);		        
		    });

		    makeItAjax();
		});			

	function funcAjax (j, params) {
		document.getElementById(j).onclick = loadXMLDoc(j, params); 		
	}

	function clickFunc(j, params) { 	
			return function (e){ 
				e.preventDefault();
				funcAjax(j, params); // has to be a func to return different values for each

				return false;
			};
	}
	
	function getParams(j){
		var href = document.getElementById(j).href + '';	
		var split = href.split("?");
		var params = "";
		if (split instanceof Array && split.length > 1)
			params = split[1];
		return splitParams(params);
	}
	
	function splitParams(params){ // do func for any n# of params		
		var params_ajax = {}
		if (typeof params !== 'undefined')
			var p =  params.split('&');
			
			$.each(p, function(key, val) {
					key_value = params.split('=');
					params_ajax[key_value[0]] = key_value[1];		        
		    });
		return params_ajax;
	}

	function makeItAjax () {
		var params_ajax = {}
		for (i = 0; i < a.length; i++) {
			var j = a[i];
			var params = getParams(j);
			
			$('#'+j).off('click');
			$('#'+j).on('click', clickFunc(j, params));
		}		
	}
	
	function loadXMLDoc(page, params) {
		
		var desired_delay = 1000;
		var message_timer = false;
		var query = 'contents/' + page + '.php'; 
//console.log(query, p, params, typeof params);

		var request = $.ajax({
							url: query,
							data: { params },
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
			history.pushState(null, page + " title", page);
			document.getElementById("ajax").innerHTML = xml;  
			makeItAjax(); 
			$("#loader").hide(400);	
			//---------  	
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Error loading contents: " + textStatus );
		});

		return false;
	}

getPages(); 
