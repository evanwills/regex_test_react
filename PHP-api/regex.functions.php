<?php

/**
 * preg_error() outputs PHP error message (if any) for a particular regex
 *
 * Takes a supplied regular expression and runs it through
 * preg_match(), trapping any errror message generated and returns
 * the error (or FALSE if no error)
 *
 * @param string $regex Regular expression to be tested
 *
 * @return string regular expression generated an error, if any
 */
function preg_error( $regex ) {
	if( !is_string($regex) ) {
		return 'Regex is not a string.'.get_bad_type($regex);
	}
	if($old_track_errors = ini_get('track_errors')) {
		$old_php_errormsg = isset($php_errormsg)?$php_errormsg:false;
		debug($old_php_errormsg);
	} else {
		ini_set('track_errors' , 1);
	}

	@preg_match($regex , '');

	$output = isset($php_errormsg)?$php_errormsg:'';

	if($old_track_errors) {
		$php_errormsg = isset($old_php_errormsg)?$old_php_errormsg:false;
	} else {
		ini_set('track_errors' , 0);
	}

	return $output;
}

/**
 * regex_match_all() returns a list or RegexMatch objects
 *
 * @param [string] $regex
 * @param [string] $input
 * @return array list of RegexMatch objects
 */
function regex_match_all( $regex, $input, $truncator) {
	$all_matches = array();

	if( preg_error($regex) !== '' ) {
		// This is a dud regex give up now
		return $all_matches;
	}

	if( preg_match_all($regex, $input, $matches, PREG_OFFSET_CAPTURE) ) {
		$match_count = count($matches[0]);
		$sub_pattern_count = count($matches);
		for( $b = 0 ; $b < $match_count ; $b += 1 ) {
			$all_matches[] = array(
				'whole' => $trunctor['whole']($matches[0][$b][0]),
				'parts' => array(),
				'position' => $matches[0][$b][1]
			);
		}

		// The first match is no use to us now so we'll delete it.
		unset($matches[0]);

		$last_key = 0;
		foreach( $matches as $sub_pattern_key => $sub_pattern_captures) {
			//	      debug($sub_pattern_key);
			for( $b = 0 ; $b < $match_count ; $b += 1 ) {
				// if the previous capture was a string and this
				// capture is a number, then this capture is the
				// indexed version of the previous capture, (i.e. a
				// duplicate), so we'll ignore it.
				if( !empty($matches[$sub_pattern_key][$b]) && ( is_string($sub_pattern_key) || !is_string    ($last_key) ) ) {
					$all_matches[$b]['parts'][$sub_pattern_key] = $truncator['parts']($matches[$sub_pattern_key][$b][0]);
				}
			}
			$last_key = $sub_pattern_key;
		}
	}

	return $all_matches;
}

function get_truncators($post) {
	$truncate_sample = function($input) { return $input; };
	$truncate_subPattern = function($input) { return $input; };

	$sample_length = isset($post['maxSampleLength']) ? $post['maxSampleLength'] : 0;
	$subpattern_length = isset($post['maxSubPatternLength']) ? $post['maxSubPatternLength'] : 0;

	if( is_numeric($sample_length) && $sample_length > 10 ) {
		settype($sample_length, 'integer');
		$truncate_sample = function($input) use ($sample_length) {
			if( strlen($input) > $sample_length ) {
				return substr($input, 0 , $sample_length).'...';
			} else {
				return $input;
			}
		};
	}

	if( is_numeric($subpattern_length) && $subpattern_length > 10 ) {
		settype($subpattern_length, 'integer');

		$truncate_sample = function($input) use ($subpattern_length) {
			if( strlen($input) > $subpattern_length ) {
				return substr($input, 0 , $subpattern_length).'...';
			} else {
				return $input;
			}
		};
	}

	return array(
		'whole' => $truncate_sample,
		'parts' => $truncate_subPattern
	);
}

function get_parse_regex_error( $regex, $id = -1 ) {
	$output = array( 'valid' => true );
	$error = preg_error($regex);

	if( $error !== '' ) {
		$output['valid'] = false;
		$output['error'] = array(
			'rawMessage' => $error,
			'message' => '',
			'offset' => -1,
			'badCharacter' => '',
			'regexID' => $id
		);
		// do some stuff
		// $output['error']['rawMessage'] = $error;
		// $output['error']['message'] = '';
		// $output['error']['offset'] = -1;
		// $output['error']['badCharacter'] = '';
		// $output['error']['regexID'] = -1;
	}

	return $output;
}

function prepare_regex($regex_pair, $a) {
	$required_fields = array('delimiterOpen', 'regex', 'delimiterClose', 'modifiers', 'replace');
	$name = '"regexPairs['.$a.']"';
	$expected = 'associtive array with the following mandatory keys: '.implode(', ',$required_fields);

	if( !is_array($regex_pair) ) {
		report_bad_request(43, $name, $expected, gettype($regex_pair).' given');
	}
	for( $a = 0 ; $a < count($required_fields) ; $a += 1 ) {
		if( !array_key_exists($required_fields[$a], $regex_pair) ) {
			report_bad_request(44, $name, $expected, $required_fields[$a].' was not given');
		}
	}

	$regex = $regex_pair['delimiterOpen'].
			 $regex_pair['regex'].
			 $regex_pair['delimiterClose'].
			 $regex_pair['modifiers'];

	$replace = $regex_pair['replace'];

	if( array_key_exists('transformWhitespaceCharacters', $regex_pair) && $regex_pair['transformWhitespaceCharacters'] === true ) {
		$replace = preg_replace(
			array( '`(?!<\\)\\t`', '`(?!<\\)\\r`', '`(?!<\\)\\n`', '`(?!<\\)\\f`' ),
			array( "\t", "\r", "\n", "\f" ),
			$replace
		);
	}

	$output[] = array(
		'id' => $regex_pair['id'],
		'error' => get_parse_regex_error($regex),
		'regex'  => $regex,
		'replace' => $replace
	);
}

function test_all( $inputs , $regex_pairs , $truncators ) {
	$output = array();
	for( $a = 0 ; $a < count($inputs) ; $a += 1 ) {
		$input = $inputs[$a];
		for( $b = 0 ; $b < count($regex_pairs) ; $b += 1 ) {
			$tmp = array(
				'error' => get_parse_regex_error($regex_pairs[$b]['error']),
				'inputID' => $a,
				'matches' => [],
				'regexID' => $regex_pairs[$b]['id']
			);
			if( $tmp['error']['valid'] === true) {
				$tmp['matches'] = regex_match_all( $regex_pairs[$b]['regex'], $input, $truncators);
			}
			$output[] = $tmp;
			$input = preg_replace( $regex , $regex_pairs[$b]['replace'] , $input );
		}
	}
	return $output;
}

function replace_all( $inputs, $regex_pairs) {
	$output = array();
	for( $a = 0 ; $a < count($inputs) ; $a += 1 ) {
		$input = $inputs[$a];

		for( $b = 0 ; $b < count($regex_pairs) ; $b += 1 ) {
			$regex =  $regex_pairs[$b]['delimiterOpen'];
			$regex .= $regex_pairs[$b]['regex'];
			$regex .= $regex_pairs[$b]['delimiterClose'];
			$regex .= $regex_pairs[$b]['modifiers'];

			if( preg_error($regex) === '' ) {
				$input = preg_replace( $regex , $regex_pairs[$b]['replace'] , $input );
			}
		}
		$output[] = $input;
	}
	return $output;
}

function report_bad_request($code , $name, $expected, $actual, $caught_message = '') {
	ob_start();
	http_response_code(400);
	if( $caught_message !== '' ) {
		$caught_message = ' '.$caught_message;
	}
	echo json_encode(array(
		'code' => $code,
		'message' => "Regex Test (PHP) API expectes $name to be $expected. $actual given.$caught_message"
	));
	ob_end_flush();
	exit;
}

function send_good_response($output) {
	ob_start();
	// http_response_code(400);
	echo json_encode($output);
	ob_end_flush();
	exit;
}

function validate_input($post) {
	$name = '"input"';
	$expected = 'a JSON object containing an array of strings to be used as inputs for testing or find/replace';
	if( !isset($post['input']) ) {
		report_bad_request(30, $name, $expected, 'No input given');
	}
	try {
		$output = json_decode($post['input'], true);
	} catch( Exception $e ) {
		report_bad_request(31, $name, $expected, 'decoding JSON failed:', $e->getMessage());
	}
	if( !is_array($output) ) {
		report_bad_request(32, $name, $expected, gettype($output).' given');
	}
	for( $a = 0 ; $a < count($output) ; $a += 1 ) {
		if( !is_string($output[$a]) ) {
			report_bad_request(34, $name, $expected, 'input['.$a.'] is not a string. '.gettype($output[$a]));
		}
	}
	return $output;
}

function validate_regex_pairs($post) {
	$name = '"regexPairs"';
	$expected = 'a JSON object containing an array of RegexPair objects to be used as find/replace for testing or find/replace';
	if( !isset($post['regexPairs']) ) {
		report_bad_request(40, $name, $expected, 'No regexPairs');
	}
	try {
		$output = json_decode($post['regexPairs'], true);
	} catch( Exception $e ) {
		report_bad_request(21, $name, $expected, 'decoding JSON failed:', $e->getMessage());
	}
	if( !is_array($output) ) {
		report_bad_request(42, $name, $expected, gettype($output));
	}
	for( $a = 0 ; $a < count($output) ; $a += 1 ) {
		$output[$a] = prepare_regex($output[$a], $a);
	}
	return $output;
}


function validate_regex($post) {
	$required_fields = array('delimiterOpen', 'regex', 'delimiterClose', 'modifiers');
	$name = '"regex"';
	$expected = 'a JSON object that decodes to an associtive array with the following mandatory keys: '.implode(', ',$required_fields);

	if( !array_key_exists('regex', $post) ) {
		report_bad_request(20, $name, $expected, '"regex" not');
	}
	try {
		$regex = json_decode($post['regex'], true);
	} catch( Exception $e ) {
		report_bad_request(21, $name, $expected, 'decoding JSON failed:', $e->getMessage());
	}

	if( !is_array($post['regex']) ) {
		report_bad_request(21, $name, $expected, gettype($regex_pair));
	}
	for( $a = 0 ; $a < count($required_fields) ; $a += 1 ) {
		if( !array_key_exists($required_fields[$a], $regex_pair) ) {
			report_bad_request(22, $name, $expected, $required_fields[$a].' was not present');
		}
	}

	$regex = $regex_pair['delimiterOpen'].
			 $regex_pair['regex'].
			 $regex_pair['delimiterClose'].
			 $regex_pair['modifiers'];

	return get_parse_regex_error($regex);
}
