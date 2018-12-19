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

function get_truncators($sample_length, $subpattern_length) {
	$truncate_sample = function($input) { return $input; };
	$truncate_subPattern = function($input) { return $input; };

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

function prepare_regexes($regexes) {
	$output = array();
	for( $a = 0 ; $a < count($regexes) ; $a += 1 ) {
		$regex = $regex_pairs[$a]['delimiterOpen'].
				 $regex_pairs[$a]['regex'].
				 $regex_pairs[$a]['delimiterClose'].
				 $regex_pairs[$a]['modifiers'];

 		$replace = $regexes[$a]['replace'];

		if( $regexes[$a]['transformWhitespaceCharacters'] === true ) {
			$replace = preg_replace(
				array( '`(?!<\\)\\t`', '`(?!<\\)\\r`', '`(?!<\\)\\n`', '`(?!<\\)\\f`' ),
				array( "\t", "\r", "\n", "\f" ),
				$replace
			);
		}

		$output[] = array(
			'id' => $regexes[$a]['id'],
			'error' => get_parse_regex_error($regex),
			'regex'  => $regex,
			'replace' => $replace
		);
	}
	return $output;
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
