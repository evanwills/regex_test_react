import {XRegExp} from 'xregexp'
import {RegexEngine} from './regex-engine.class'
import {DelimPair, RegexPair, ConstructedRegex, RegexTestResult, RegexMatch, ValidatedRegex, regexTestGlobal} from './regex-engine.interfaces'


abstract class LocalRegex extends RegexEngine {

  public isValid(regex: string, modifiers: string, delimiters?: DelimPair) : string {
    let tmp;
    try {
      tmp = this._getRegexObject(regex, modifiers);
    } catch(e) {
      return e;
    }
    return '';
  }

  public replace(input: Array<string>, regexes: Array<RegexPair>) : Array<string> {
    let output = [];
    let constructedRegexes = this._getConstructedRegexes(regexes);

    for (let a = 0; a < input.length; a += 1) {
      let tmp = input[a];
      for (let b = 0; b < constructedRegexes.length; b += 1) {
        if (constructedRegexes[b].error['valid'] === true) {
          tmp = tmp.replace(
            constructedRegexes[b].find,
            constructedRegexes[b].replace
          );
        }
      }
      output.push(tmp);
    }

    return output;
  }

  public test(input: Array<string>, regexes: Array<RegexPair>) : Array<RegexTestResult> {
    let output = [];
    let constructedRegexes = this._getConstructedRegexes(regexes);

    for (let a = 0; a < input.length; a += 1) {
      let tmp = input[a];
      for (let b = 0; b < constructedRegexes.length; b += 1) {
        let error:ValidatedRegex = constructedRegexes[b].error;
        let results:regexTestGlobal
        if (constructedRegexes[b].error['valid'] !== false) {
          if (constructedRegexes[b].find.global === true) {
            results = this._regexTestGlobal(constructedRegexes[b].find, tmp)
          } else {
            let startTime = Date.now();
            let matches = constructedRegexes[b].find.exec(tmp);
            let execTime = Date.now() - startTime;
            if (matches !== null) {
              results = {
                matches: [this._regexTestInner(matches)],
                execTime: execTime
              }
            }
          }

          // apply the find/replace to the current input so if the
          // next regex relies on this change it'll work.
          tmp = tmp.replace(
            constructedRegexes[b].find,
            constructedRegexes[b].replace
          );
        }

        output.push({
          error: error,
          executionTime: results['execTime'],
          inputID: a,
          matches: results['matches'],
          regexID: constructedRegexes[b].regexID
        });
      }
    }

    return output;
  }

  /**
   * Generic function that builds a list of reusable RegExp objects
   * that can be used either for testing or for replacing
   *
   * @param regexes a list of one or more regular expression pairs
   */
  protected _getConstructedRegexes(regexes: Array<RegexPair>) : Array<ConstructedRegex> {
    let output = [];
    for (let a = 0; a < regexes.length; a += 1) {
      let tmpRegexp;
      let isValid = {
        valid: true
      }
      try {
        tmpRegexp = this._getRegexObject(regexes[a].regex, regexes[a].modifiers);
      } catch(e) {
        isValid['error'] = {
          rawMessage: e,
          message: '',
          offset: -1,
          badCharacter: '',
          regexID: regexes[a].id
        };
      }
      output.push({
        error: isValid,
        find: tmpRegexp,
        regexID: regexes[a].id,
        replace: regexes[a].replace
      })
    }
    return output;
  }

  protected _getRegexObject(regex: string, modifiers: string) : RegExp {
    let output : RegExp;
    try {
      output = new RegExp('');
    } catch (e) {
      throw new Error(e);
    }
    return output;
  }

  /**
   * _regexTestGlobal() builds an array of RegexMatch objects created by a RegExp object with the Global flag set
   *
   * @param regex RegExp object
   * @param input string to be tested against the regex
   */
  protected _regexTestGlobal(regex: RegExp, input: string) : regexTestGlobal {
    let output = []
    // let output2 = []
    let matches
    let ellapsedTime = 0;
    let startTime = Date.now();
    while ((matches = regex.exec(input)) !== null) {
      ellapsedTime += (Date.now() - startTime);
      output.push(this._regexTestInner(matches))
      startTime = Date.now();
    }
    return {
      matches: output,
      execTime: ellapsedTime
    }
  }

  /**
   * _regexTestInner() builds a RegexMatch object from what is returned
   * by RegExp.exec()
   *
   * @param matches object returned by RegExp.prototype.exec()
   */
  protected _regexTestInner(matches: any) : RegexMatch {
    let newMatch = {
      whole: matches[0],
      parts: {},
      position: matches.index
    }
    let a = 0
    let c = Object.keys(matches).length - 2
    for (let prop in matches) {
      console.log('prop:', prop)
      if (matches.hasOwnProperty(prop)) {
        if (a > 0 && a < c) {
          newMatch.parts[prop] = matches[prop]
        }
      }
      a += 1
    }

    return newMatch
  }
}


export class VanillaJSregex extends LocalRegex {
  protected _getRegexObject(pattern: string, modifiers: string) : any {
    let output;
    try {
      output = new RegExp(pattern, modifiers);
    } catch (e) {
      throw new Error(e);
    }
    return output;
  }
}


export class XRegExpRegex extends LocalRegex {
  protected _getRegexObject(pattern: string, modifiers: string) : any {
    let output;
    try {
      output = XRegExp(pattern, modifiers);
    } catch (e) {
      throw new Error(e);
    }
    return output;
  }
}
