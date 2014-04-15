	var a = [];
			/*["home",
			"services",
			"contact"];*/

	function getPages(){
	    return $.getJSON('acms/pages.json');
	}
		getPages().done(function(pages) {
		    a = [];
		    $.each(pages, function(key, val) {
		        a.push(val);
		    });

		    makeItAjax();
		});			

	function funcAjax (j) {
		//console.log(j, " ", document.getElementById(j));
		document.getElementById(j).onclick = loadXMLDoc(j); 		
	}

	function makeFunc(j) { 	
			return function (e){ 
				e.preventDefault();
				funcAjax(j); 

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
			document.getElementById(j).onclick = makeFunc(j);			
		}
	 }

getPages(); 