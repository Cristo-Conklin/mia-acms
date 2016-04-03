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
				console.log(key, exceptions.indexOf(key)>=0, exceptions);
				if (exceptions.indexOf(key)>=0) {
					console.log('except: ', key);
					a.pop(a);
				} else
					a.push(key);
		        
		    });

		    makeItAjax();
		});			

	function funcAjax (j) {
		//console.log(j, " ", document.getElementById(j));
		document.getElementById(j).onclick = loadXMLDoc(j); 		
	}

	function clickFunc(j) { 	
			return function (e){ 
				e.preventDefault();

				return false;
			};
		 }

	 function makeItAjax () {
	 	// TODO: get a array from file 
	 	// 	...or process links with an specific marker: css class, etc... 
	 	// getPages():

 		for (i = 0; i < a.length; i++) {
			var j = a[i];
//console.log(j);
			document.getElementById(j).href = "#";
			document.getElementById(j).onclick = clickFunc(j);			
		}
	 }

getPages(); 