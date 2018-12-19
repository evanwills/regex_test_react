<?php
// ==================================================================
// START: debug include

if(!function_exists('debug')) {
	if(isset($_SERVER['HTTP_HOST'])){ $path = $_SERVER['HTTP_HOST']; $pwd = dirname($_SERVER['SCRIPT_FILENAME']).'/'; }
	elseif(isset($_SERVER['USER'])){ $path = $_SERVER['USER']; $pwd = $_SERVER['PWD'].'/'; }
	elseif(isset($_SERVER['USERNAME'])){ $path = $_SERVER['USERNAME'].'-win'; $pwd = $_SERVER['PWD'];}
	if( substr_compare( $path , '192.168.' , 0 , 8 ) == 0 ) { $path = 'localhost'; }
	switch($path) {
		case 'pademelon':       // work laptop (debian)
		case 'localhost':       // home laptop
		case 'evan':            // home laptop
		case 'ewills':			// webapps VM
		case '192.168.33.128':
		case '192.168.33.129': $root = '/var/www/html/'; $inc = $root.'includes/'; $classes = $cls = $root.'classes/'; break;

		case '192.168.153.128': // work laptop (debian)
		case 'antechinus':      // work laptop (debian)
		case 'wombat': $root = '/var/www/'; $inc = $root.'includes/'; $classes = $cls = $root.'classes/';
			break; // home laptop

		case 'evwills-win':
			$root = 'C:\\users\\evwills\\Documents\\Evan\\code\\'; $inc = $root.'includes\\'; $classes = $cls = $root.'classes\\';
			$pwd = str_replace(array('/c/', '/'), array('C:\\', '\\'), $pwd); break; // windows laptop

		case 'apps.acu.edu.au':         // ACU
		case 'testapps.acu.edu.au':     // ACU
		case 'dev1.acu.edu.au':         // ACU
		case 'blogs.acu.edu.au':        // ACU
		case 'studentblogs.acu.edu.au': // ACU
		case 'dev-blogs.acu.edu.au':    // ACU
		case 'evanw': $root = '/home/evanw/'; $inc = $root.'includes/'; $classes = $cls = $root.'classes/'; break;

		case 'webapps.acu.edu.au':         // ACU
		case 'panvpuwebapps01.acu.edu.au': // ACU
		case 'test-webapps.acu.edu.au':    // ACU
		case 'panvtuwebapps01.acu.edu.au': // ACU
		case 'dev-webapps.acu.edu.au':     // ACU
		case 'panvduwebapps01.acu.edu.au': // ACU
		case 'evwills':
		if( isset($_SERVER['HOSTNAME']) && $_SERVER['HOSTNAME'] = 'panvtuwebapps01.acu.edu.au' ) {
			$root = '/home/evwills/'; $inc = $root.'includes/'; $classes = $cls = $root.'classes/'; break; // ACU
		} else {
			$root = '/var/www/html/mini-apps/'; $inc = $root.'includes_ev/'; $classes = $cls = $root.'classes_ev/'; break;
		}
	};

	set_include_path( get_include_path().PATH_SEPARATOR.$inc.PATH_SEPARATOR.$cls.PATH_SEPARATOR.$pwd);

	if(file_exists($inc.'debug.inc.php')) {
		if(!file_exists($pwd.'debug.info') && is_writable($pwd) && file_exists($inc.'template.debug.info'))
		{ copy( $inc.'template.debug.info' , $pwd.'debug.info' ); };
		include($inc.'debug.inc.php');
	}
	else { function debug(){}; }
};

//===================================================================

require_once('./regex.functions.php');

if( isset($_REQUEST) && array_key_exists('mode', $_REQUEST) ) {
	switch($_REQUEST['mode']) {
		case 'validate':
			require_once('./validate-regex.inc.php');
			validate_regex($_POST);
			break;
		case 'test':
			require_once('./test-regex.inc.php');
			do_test_regex($_POST);
			break;
		case 'replace':
			require_once('./do-find-replace.inc.php');
			do_find_replace($_POST);
			break;
		default:
			report_bad_mode($_REQUEST['mode']);
	}
} else {
	report_no_mode();
}
