	var a = [];
			/*["home",
			"services",
			"contact"];*/
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

	function makeItAjax () {
		// TODO: get a array from file 
		// 	...or process links with an specific marker: css class, etc... 

		for (i = 0; i < a.length; i++) {
			var j = a[i];
			
			// func
			var href = document.getElementById(j).href + '';;		
			var split = href.split("?");
			var params = "";
			if (split instanceof Array)
				params = split[1];
			
			document.getElementById(j).href = "#";
			document.getElementById(j).onclick = clickFunc(j, params);			
		}
	}
	
	function loadXMLDoc(page, params) {
		
		var desired_delay = 1000;
		var message_timer = false;
		var query = 'contents/' + page + '.php'; //'index.php?ajax=true&page=' + page;
		
		// do func for any n# of params
		var p = params.split('=')[1];
console.log(query, p);

		var request = $.ajax({
							url: query,
							data: { p: p },
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

getPages(); 