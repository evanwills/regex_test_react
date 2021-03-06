<?php


/**
 * get_bad_type() returns meta data about the input. It is intended to
 * be used to give extra info when throwing an Exception.
 *
 * @param mixed $input
 * @param integer $max_length
 * @return string
 */
function get_bad_type($input, $max_length = 200) {
	$output = gettype($input);
	$extra = '';
	$do_dump = false;

	switch( $output ) {
		case 'array':
			$do_dump = true;
			break;
		case 'boolean':
			if( $input === true ) {
				$extra = '[TRUE]';
			} else {
				$extra = '[FALSE]';
			}
			break;
		case 'class':
			$do_dump = true;
			$extra = get_class($input);
			break;
		case 'string':
			if( strlen($input) > 200 ) {
				$extra = '"'.substr($input, 0, 197).'..."';
			} else if( $input === '' ) {
				$extra = '[empty string]';
			} else if( trim($input) === '' ) {
				$extra = '[string containing only white space]';
			} else {
				$extra = '"'.$output.'"';
			}

		case 'double':
		case 'float':
		case 'integer':
			$extra = $output;
			break;
		case 'resource':
			$do_dump = true;
			$extra = get_resource_type($input);
	}
	if( $extra !== '' ) {
		$extra = ' ('.$extra.')';
	}

	$output .= $extra.' given.';
	if( $do_dump === true ) {
		$tmp = ob_get_clean();
		var_dump($input);
		$output .= "\n".ob_get_clean();
		echo $tmp;
	}
	return ' '.$output;
}

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
 * @param string $regex
 * @param string $input
 * @param array $truncator
 * @return array list of RegexMatch objects
 */
function regex_match_all( $regex, $input, $truncator) {
	$all_matches = array();

	if( preg_error($regex) !== '' ) {
		// This is a dud regex give up now
		return $all_matches;
	}

	$start = microtime(true);
	$duration = 0;
	if( preg_match_all($regex, $input, $matches, PREG_OFFSET_CAPTURE) ) {
		$duration = (microtime(true) - $start) * 1000;
		$match_count = count($matches[0]);
		$sub_pattern_count = count($matches);
		for( $b = 0 ; $b < $match_count ; $b += 1 ) {
			$all_matches[] = array(
				'whole' => $truncator['whole']($matches[0][$b][0]),
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

	return array('matches' => $all_matches, 'executionTime' => $duration);
}

/**
 * get_truncators() returns an associative array containing two
 * functions one to manage truncating whole matches and one to manage
 * truncating captured sub-patterns
 *
 * $post the contents of global variable $_POST
 *
 * return has the following shape:
 * {
 *   whole: function,
 *   parts: function
 * }
 *
 * @param array $post
 * @return array
 */
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

/**
 * get_parse_regex_error() returns an associative array in one of the
 * following shapes:
 *
 *  {
 * 	  "valid": true
 *  }
 *
 * or
 *
 *  {
 * 	  "valid": false,
 * 	  "error": {
 *	    "rawMessage": string,
 *	    "message": string,
 *	    "offset": integer,
 *	    "badCharacter": string,
 *	    "regexID": integer
 * 	  }
 *  }
 *
 * $regex complete regular expression string including delimiters and
 * modifiers
 * $id the ID of the regex (as supplied in the request)
 *
 * @param string $regex
 * @param integer $id
 * @return array
 */
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

/**
 * prepare_regex() builds an object that can be used for testing and
 * doing find/replace actions on inputs
 *
 * $regex_pair an associative array matching the RegexPair interface
 * {
 *   delimiterClose?: string,
 *   delimiterOpen?: string,
 *   doReplaceOnTest: boolean,
 *   id: number,
 *   modifiers: string,
 *   regex: string,
 *   replace: string,
 *   transformWhitespaceCharacters: boolean
 * }
 *
 * $a is the index in of the supplied regex pair.
 *
 * returns an associative arrays, each with the following shape:
 *
 * {
 *   id: integer,
 *   error: ValidatedRegex,
 *   regex: string,
 *   replace: string,
 *   doReplaceOnTest: function
 * }
 *
 * @param array $regex_pair
 * @param integer $a
 * @return void
 */
function prepare_regex($regex_pair, $a) {
	$required_fields = array('delimiterOpen', 'regex', 'delimiterClose', 'modifiers', 'replace');
	$name = '"regexPairs['.$a.']"';
	$expected = 'associtive array with the following mandatory keys: '.implode(', ',$required_fields);

	if( !is_array($regex_pair) ) {
		report_bad_request(43, $name, $expected, get_bad_type($regex_pair).' given');
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
	$error = get_parse_regex_error($regex);

	if( !array_key_exists('transformWhitespaceCharacters', $regex_pair) || $regex_pair['transformWhitespaceCharacters'] === true ) {
		$replace = preg_replace(
			array( '`(?!<\\)\\t`', '`(?!<\\)\\r`', '`(?!<\\)\\n`', '`(?!<\\)\\f`' ),
			array( "\t", "\r", "\n", "\f" ),
			$replace
		);
	}

	$do_replace_on_test = function($input) { return $input; };
	if( !array_key_exists('doReplaceOnTest', $regex_pair) || $regex_pair['doReplaceOnTest'] === true ) {
		$do_replace_on_test = function($input) use ($regex, $replace) {
			return preg_replace($regex, $replace, $input);
		};
	}

	return array(
		'id' => $regex_pair['id'],
		'error' => $error,
		'regex'  => $regex,
		'replace' => $replace,
		'doReplaceOnTest' => $do_replace_on_test
	);
}

/**
 * test_all() applies a list of one or more regular expressions to a
 * list of one or more string inputs.
 *
 * $inputs list of strings to apply regex to
 *
 * $regex_pairs list of regex pair objects to apply to inputs
 *
 * $truncators pair of functions for truncating whole matches and
 * sub-patterns
 *
 * returns an array of RegexTestResult compliant associative arrays
 *
 * @param array $inputs list of strings to apply regex to
 * @param array $regex_pairs list of regex pair objects to apply to inputs
 * @param array $truncators pair of functions for truncating whole matches and sub-patterns respectively
 * @return array
 */
function test_all( $inputs , $regex_pairs , $truncators ) {
	$output = array();
	for( $a = 0 ; $a < count($inputs) ; $a += 1 ) {
		$input = $inputs[$a];
		for( $b = 0 ; $b < count($regex_pairs) ; $b += 1 ) {
			$tmp = array(
				'error' => get_parse_regex_error($regex_pairs[$b]['regex']),
				'inputID' => $a,
				'matches' => [],
				'regexID' => $regex_pairs[$b]['id'],
				'executionTime' => 0
			);
			if( $tmp['error']['valid'] === true) {
				$matches = regex_match_all( $regex_pairs[$b]['regex'], $input, $truncators);
				$tmp = array_merge($tmp, $matches);
			}
			$output[] = $tmp;
			$input = preg_replace( $regex_pairs[$b]['regex'] , $regex_pairs[$b]['replace'] , $input );
		}
	}
	return $output;
}

/**
 * replace_all() does a find an replace on all input strings using
 * all regex pairs
 *
 * $inputs list of strings to apply regex to
 *
 * $regex_pairs list of RegexPair objects to apply to inputs
 *
 * returns an array of strings modified by all the supplied regexes
 *
 * @param array $inputs
 * @param array $regex_pairs
 * @return array
 */
function replace_all( $inputs, $regex_pairs) {
	$output = array();
	for( $a = 0 ; $a < count($inputs) ; $a += 1 ) {
		$input = $inputs[$a];

		for( $b = 0 ; $b < count($regex_pairs) ; $b += 1 ) {
			if( $regex_pairs[$b]['error']['valid'] === true ) {
				$input = preg_replace( $regex_pairs[$b]['regex'] , $regex_pairs[$b]['replace'] , $input );
			}
		}
		$output[] = $input;
	}
	return $output;
}

/**
 * report_bad_request() sends a APIresponse json object to the
 * requestor identifying what was wrong with their request.
 *
 * $code the number representing the problem encountered
 *
 * $name the name of the part of the request that had an issue
 *
 * $expected string explaining what the API was expecting
 *
 * $actual string describing what it received
 *
 * $caught_message if the bad request was triggered by a caught
 * Exception, then caught message is the error created by the Exception
 *
 * The JSON object sent back to the requestor is in the following
 * shape:
 * {
 *   'ok': false,
 *   'code': number,
 *   'content': string,
 *   'returnType': string
 * }
 *
 * @param integer $code
 * @param string $name
 * @param string $expected
 * @param string $actual
 * @param string $caught_message
 * @return void
 */
function report_bad_request($code , $name, $expected, $actual, $caught_message = '') {
	http_response_code(400);
	$message = "Regex Test (PHP) API expectes $name to be $expected. $actual given.";
	if( $caught_message !== '' ) {
		$message .= ' '.$caught_message;
	}

	$response = array(
		'ok' => false,
		'code' => $code,
		'content' => $message,
		'returnType' => 'error'
	);
	echo json_encode($response);
}

/**
 * send_good_response() sends a APIresponse json object to the
 * requestor identifying with the output from the request.
 *
 * $output is an array containing one of the following types:
 *  * ValidatedRegex
 *  * RegexTestResult
 *  * string
 *
 * $returnType represents the type of objects returned in array.
 * Options are
 *  * ValidatedRegex
 *  * RegexTestResult
 *  * string
 *
 * The JSON object sent back to the requestor is in the following
 * shape:
 * {
 *   'ok': true,
 *   'code': 1,
 *   'content': $output,
 *   'returnType': $returnType
 * }
 *
 * @param array $output
 * @param string $returnType
 * @return void
 */
function send_good_response($output, $returnType) {
	$response = array(
		'ok' => true,
		'code' => 1,
		'content' => $output,
		'returnType' => $returnType
	);
	echo json_encode($response);
}

/**
 * validate_input() tests the "inputs" sent in the request to ensure
 * they are all strings in an array
 *
 * $post the contents of global variable $_POST
 *
 * Returns an array of strings
 *
 * @param array $post
 * @return array
 */
function validate_input($post) {
	$name = '"input"';
	$expected = 'a JSON object containing an array of strings to be used as inputs for testing or find/replace';
	if( !isset($post['inputs']) ) {
		report_bad_request(30, $name, $expected, 'No input given');
	}
	try {
		$output = json_decode($post['inputs'], true);
	} catch( Exception $e ) {
		report_bad_request(31, $name, $expected, 'decoding JSON failed:', $e->getMessage());
	}
	if( !is_array($output) ) {
		report_bad_request(32, $name, $expected, get_bad_type($output).' given');
	}
	for( $a = 0 ; $a < count($output) ; $a += 1 ) {
		if( !is_string($output[$a]) ) {
			report_bad_request(34, $name, $expected, 'inputs['.$a.'] is not a string. '.get_bad_type($output[$a]));
		}
	}
	return $output;
}

/**
 * validate_regex_pairs() tests to see request has a "regexes"
 * property and that it contains an array of RegexPair objects
 *
 * $post the contents of global variable $_POST
 *
 * returns an array of associative arrays, each with the following
 * shape:
 *
 * {
 *   id: integer,
 *   error: ValidatedRegex,
 *   regex: string,
 *   replace: string,
 *   doReplaceOnTest: function
 * }
 *
 * @param array $post
 * @return array
 */
function validate_regex_pairs($post) {
	$expected = 'a JSON object containing an array of RegexPair objects to be used as find/replace for testing or find/replace';
	if( array_key_exists('regexes', $post) ) {
		$key = 'regexes';
	} elseif( array_key_exists('regex', $post) ) {
		$key = 'regex';
	} else {
		report_bad_request(40, "\"$key\"", $expected, 'No regexPairs');
	}
	try {
		$output = json_decode($post[$key], true);
	} catch( Exception $e ) {
		report_bad_request(41, $name, $expected, 'decoding JSON failed:', $e->getMessage());
	}
	if( !is_array($output) ) {
		report_bad_request(42, $name, $expected, get_bad_type($output));
	}
	for( $a = 0 ; $a < count($output) ; $a += 1 ) {
		$output[$a] = prepare_regex($output[$a], $a);
	}
	return $output;
}

/**
 * validate_regex() validates a single regex expression
 *
 * $post the contents of global variable $_POST
 *
 * returns a single associative array conforming to ValidatedRegex
 * matching either one of the following shapes
 *  {
 * 	  "valid": true
 *  }
 *
 * or
 *
 *  {
 * 	  "valid": false,
 * 	  "error": {
 *	    "rawMessage": string,
 *	    "message": string,
 *	    "offset": integer,
 *	    "badCharacter": string,
 *	    "regexID": integer
 * 	  }
 *  }
 *
 * @param array $post
 * @return array
 */
function validate_regex($post) {
	$required_fields = array('delimiterOpen', 'regex', 'delimiterClose', 'modifiers');
	$name = '"regex"';
	$expected = 'a JSON object that decodes to an associtive array with the following mandatory keys: '.implode(', ',$required_fields);

	if( !array_key_exists('regex', $post) ) {
		report_bad_request(20, $name, $expected, '"regex" not');
	}
	try {
		$regex_pair = json_decode($post['regex'], true);
	} catch( Exception $e ) {
		report_bad_request(21, $name, $expected, 'decoding JSON failed:', $e->getMessage());
	}

	if( !is_array($regex_pair) ) {
		report_bad_request(22, $name, $expected, get_bad_type($regex_pair), $post['regex']);
	}
	for( $a = 0 ; $a < count($required_fields) ; $a += 1 ) {
		if( !array_key_exists($required_fields[$a], $regex_pair) ) {
			report_bad_request(23, $name, $expected, $required_fields[$a].' was not present');
		}
	}

	$regex = $regex_pair['delimiterOpen'].
			 $regex_pair['regex'].
			 $regex_pair['delimiterClose'].
			 $regex_pair['modifiers'];

	return get_parse_regex_error($regex);
}
