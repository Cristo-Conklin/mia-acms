<?	public function save_pages_js($contents)
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
		file_put_contents('../acms/pages.js', $json); // for php

	}