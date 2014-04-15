<?php  
/*
if you make any profit or save any money by using this scripts,
you must give a donation of any amount to the following paypal:
cristoconklin@gmail.com

Free for study purposes. Give (a)ttribution if developed further.
*/

Class MIA {
	private $noajax;

	function __construct() {
		$this->noajax = $this->acms();
    	if ($this->check_ajax()) die();
	}	

	public function getAjax()
	{
		return $this->noajax;
	}

	public function save_pages_js($contents)
	{
		/*$contents = array(
						/*'404' =>	array(
								// 'page' => '404', // page as array key is optimal
								'title' => 'Page title goes here',
								'meta_descr' => '', // pass meta description for a good SEO
								'texto' => '404.php', // file with contents
								),
						'home'	=> array(									
								'title' => 'Home Page title goes here',
								'meta_descr' => '', 
								'texto' => 'contents/home.php', 
								),	
						'services'	=> array(									
								'title' => 'Services Page title goes here',
								'meta_descr' => '', 
								'texto' => 'contents/services.php', 
								),	
						'contact'	=> array(									
								'title' => 'Contact Page title goes here',
								'meta_descr' => '', 
								'texto' => 'contents/contact.php', 
								),														
					); */

		$json = json_encode($contents); 
		file_put_contents('acms/pages.js', $json); // for php

		// array with keys for mia.js
		$mia_js = array_keys($contents);
		unset($mia_js[404]);
		$mia_js = json_encode($mia_js);
		file_put_contents('acms/pages.json', $mia_js);
	}

	private function load_pages_js()
	{
		return json_decode(file_get_contents('acms/pages.js'), true);
	}

	public function acms()
	{		
		$contents = $this->load_pages_js();
		//var_dump($contents);

		// $this->save_pages_js($contents); // un-comment once after updating manually the menu array in function save_pages_js

		if (isset($_GET['page']) && !empty($_GET['page'])): 
			if (isset($contents[$_GET['page']]))
				$page = $contents[$_GET['page']];
			else
				$page = $contents['404'];
		else:
			$page = $contents['home'];
		endif;

		// uses $page["texto"] for contents
		// way to use template.php
		ob_start();
		include 'acms/template.php';
		$content = ob_get_contents();
		ob_end_clean();

		return $content;
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


