<?php  
/*
if you make any profit or save any money by using this scripts,
you should buy me a cup of tea at paypal:
cristoconklin ( at ) gmail.com

Free for study purposes. Give (a)ttribution if developed further.
*/

Class Mia {

	private function load_pages_js()
	{
		return json_decode(file_get_contents('acms/pages.js'), true);
	}

	public function acms()
	{		
		$contents = $this->load_pages_js();

		if (isset($_GET['page']) && isset($contents[$_GET['page']]))
			$page = $contents[$_GET['page']];
		else if (empty($_GET['page']))
			$page = $contents['home'];
		else
			$page = $contents['404'];

		return file_get_contents('contents/' . $page["texto"]);
	}
	
}


