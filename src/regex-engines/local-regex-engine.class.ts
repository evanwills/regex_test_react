import {XRegExp} from 'xregexp'
import {RegexEngine} from './regex-engine.class'
import {DelimPair, RegexPair, ConstructedRegex, RegexTestResult, RegexMatch} from './regex-engine.interfaces'


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
        if (constructedRegexes[b].error === '') {
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
        let error = '';
        let results = []
        if (constructedRegexes[b].error !== '') {
          error = constructedRegexes[b].error;
        } else {
          if (constructedRegexes[b].find.global === true) {
            results = this._regexTestGlobal(constructedRegexes[b].find, tmp)
          } else {
            let matches = constructedRegexes[b].find.exec(tmp);
            if (matches !== null) {
              results = [this._regexTestInner(matches)]
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
          inputID: a,
          matches: results,
          regexID: b
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
      let error = '';
      try {
        tmpRegexp = this._getRegexObject(regexes[a].regex, regexes[a].modifiers);
      } catch(e) {
        error = e;
      }
      output.push({
        error: error,
        find: tmpRegexp,
        replace: regexes[a].replace
      })
    }
    return output;
  }

  protected _getRegexObject(regex: string, modifiers: string) : RegExp {
    let output;
    try {
      output = new RegExp('');
    } catch (e) {
      throw new Error(e);
    }
    return output;
  }

  /**
   * _regexTestGlobal() builds an array of RegexMatch objects created by a RegExp object with the Global flag set
   * @param regex RegExp object
   * @param input string to be tested against the regex
   */
  protected _regexTestGlobal(regex: RegExp, input: string) : Array<RegexMatch> {
    let output = []
    // let output2 = []
    let matches
    while ((matches = regex.exec(input)) !== null) {
      output.push(this._regexTestInner(matches))
    }
    return output
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
