<?php  
/*
if you make any profit or save any money by using this scripts,
you must give a donation of any amount to the following paypal:
cristoconklin ( at ) gmail.com

Free for study purposes. Give (a)ttribution if developed further.
*/

Class Mia {
	private $noajax;

	function __construct() {
		$this->noajax = $this->acms();
    	if ($this->check_ajax()) die();
	}	

	public function getAjax()
	{
		return $this->noajax;
	}

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

		return file_get_contents($page["texto"]);
	}
	
	public function check_ajax()
	{
		if (isset($_GET['ajax']) && $_GET['ajax']=='true') {
			echo $this->noajax; 
			unset($this->noajax);
			return true;
		}											
		return false;
	}
}


