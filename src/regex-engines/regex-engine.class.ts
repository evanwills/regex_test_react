import {PairedDelimter, DelimPair, RegexType, RegexPair, RegexConfig, RegexTestResult} from './regex-engine.interfaces'


export abstract class RegexEngine {
  readonly id: string;
  readonly apiURL: string;
  readonly docsURL: string;
  readonly delimiterRequired: boolean;
  readonly modifiers: Array<string>;
  readonly name: string;
  readonly pairedDelimiters: PairedDelimter;

  protected _closeDelimiter: string;
  protected _openDelimiter: string;
  protected _validateDelimiter: RegExp;

  constructor (engine: RegexConfig) {
    this.id = engine.id;
    this.apiURL = engine.apiURL;
    this.docsURL = engine.docsURL;
    this.delimiterRequired = engine.delimiterRequired;

    const modRegex = new RegExp('^[a-ZA-Z]$');
    for (let a = 0; a < engine.modifiers.length; a += 1) {
      if (engine.modifiers[a].match(modRegex)) {
        this.modifiers.push(engine.modifiers[a]);
      } else {
        throw new Error('All modifiers (aka flags) must be alphabetical characters. "' + engine.modifiers[a] + '" is not valid');
      }
    }
    this.name = engine.name

    if (this.delimiterRequired) {
      if (typeof engine.pairedDelimiters !== 'undefined') {
        for (let prop in engine.pairedDelimiters) {
          if (engine.pairedDelimiters.hasOwnProperty(prop)) {
            let error = '';
            let sep = '';
            if (!this.delimiterIsValid(engine.pairedDelimiters[prop][0])) {
              error = 'opening paired delimiter is invalid';
              sep = ' and ';
            }
            if (!this.delimiterIsValid(engine.pairedDelimiters[prop][0])) {
              error += sep + 'closinging paired delimiter is invalid';
            }
            if (error === '') {
              this.pairedDelimiters[prop] = engine.pairedDelimiters[prop];
            } else {
              throw new Error('Paired delimiter ' + prop + ' is invalid ' + error);
            }
          }
        }
        this.pairedDelimiters = engine.pairedDelimiters
      }

      this._validateDelimiter = new RegExp('^[^a-z0-9\s\\\\]$', 'i');
      this.setDefaultDelimiter(engine.defaultDelimiter);
    }
  }

  public getDelimiter() : string {
    return this._openDelimiter;
  }

  public getOpenDelimiter() : string {
    return this._openDelimiter;
  }

  public getCloseDelimiter() : string {
    return this._closeDelimiter;
  }

  public delimiterIsRequired () : boolean {
    return this.delimiterRequired;
  }

  public delimiterIsValid (delim: string) : boolean {
    if (!this.delimiterRequired) {
      return true;
    }
    return this._validateDelimiter.test(delim);
  }

  public getDelimterPair (delim: string) : DelimPair {
    let open = '';
    let close = '';

    if (this.delimiterIsValid(delim) ) {
      if (typeof this.pairedDelimiters[delim] !== 'undefined') {
        open = this.pairedDelimiters[delim][0];
        close = this.pairedDelimiters[delim][1];
      } else {
        open = delim;
        close = delim;
      }
      return {open: open, close: close};
    } else {
      throw new Error('delimiter "' + delim + '" was invalid.')
    }
  }

  /**
   *
   * @param delim single, non-alphanumeric, non whitespace ,non backslash character
   */
  public setDefaultDelimiter (delim: string) : boolean {
    let delims
    try {
      delims = this.getDelimterPair(delim);
    } catch(e) {
      throw new Error('Cannot set default regular expression delimiter using "' + delim + '" because it is invalid. Delimiters must be a single non-alphanumeric, non whitespace ,non backslash character.');
    }
    this._openDelimiter = delims.open;
    this._closeDelimiter = delims.close;
    return true;
  }

  /**
   * getValidModifiers() validates and de-dups regular expresson
   * modifiers
   *
   * @param modifiers regular expression modifier (flag) characters
   * @returns string list of unique valid regular expression modifier
   *          characters
   */
  public getValidModifiers(modifiers: string) : string {
    let validModifiers = [];
    let tmpModifiers = modifiers.split('');
    let output = '';
    for (let a = 0; a < tmpModifiers.length; a += 1) {
      if (validModifiers.indexOf(tmpModifiers[a]) === -1 && this.modifiers.indexOf(tmpModifiers[a]) > -1) {
        validModifiers.push(tmpModifiers[a]);
        output += tmpModifiers[a];
      }
    }
    return output;
  }

  public abstract isValid(regex: string, modifiers: string, delimiters?: DelimPair) : string;

  public abstract test(input: Array<string>, regexes: Array<RegexPair>) : Array<RegexTestResult>;

  public abstract replace(input: Array<string>, regexes: Array<RegexPair>) : Array<string>;
}
