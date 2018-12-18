import {XRegExp} from 'xregexp'
import {RegexEngine} from './regex-engine.class'
import {DelimPair, RegexPair, ConstructedRegex, RegexTestResult} from './regex-engine.interfaces'


abstract class LocalRegex extends RegexEngine {
  protected _getRegexObject(regex: string, modifiers: string) : RegExp {
    let output;
    try {
      output = new RegExp('');
    } catch (e) {
      throw new Error(e);
    }
    return output;
  }

  public isValid(regex: string, modifiers: string, delimiters?: DelimPair) : string {
    let tmp;
    try {
      tmp = this._getRegexObject(regex, modifiers);
    } catch(e) {
      return e;
    }
    return '';
  }

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
        isGlobal: (regexes[a].modifiers.indexOf('g') > -1),
        replace: regexes[a].replace
      })
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
          let matches = constructedRegexes[b].find.match(tmp);

          if (matches === null) {
            matches = []
          } else {
            if (constructedRegexes[b].isGlobal === true) {
              for (let c = 0; c < matches.length; c += 1) {
                results.push({
                  wholeMatch: matches[c].shift(),
                  matchedParts: matches[c]
                });
              }
            } else {
              results = [{
                wholeMatch: matches.shift(),
                matchedParts: matches
              }];
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
