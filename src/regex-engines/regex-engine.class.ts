import { flagsModifiers, IDelimModError, IDelimPair, IRegexConfig, IRegexPair, IRegexTestResult, IValidatedDelimiters, IValidatedModifiers } from './regex-engine.interfaces'


export abstract class RegexEngine {
  protected allowPairedDelimiters : boolean = false;
  protected allowedDelimiters : string[];
  protected apiURL : string;
  protected defaultModifiers: string = '';
  protected defaultDelimiters : IDelimPair = { close: '', open: ''};
  protected delimiterRequired : boolean;
  protected docsURL : string;
  protected id : string;
  protected modifiers : string[] = [];
  protected modifiersName : flagsModifiers;
  protected name : string;
  protected pairdDelimiters : IDelimPair[] = [];

  constructor (engine: IRegexConfig) {
    this.id = engine.id;
    this.name = engine.name;
    this.apiURL = engine.apiURL;
    this.docsURL = engine.docsURL;
    this.delimiterRequired = engine.delimiterRequired;
    this.allowedDelimiters = engine.allowedDelimiters;
    this.pairdDelimiters = engine.pairedDelimiters;
    this.allowPairedDelimiters = (engine.pairedDelimiters.length > 0);
    this.modifiersName = engine.modifiersName;

    try {
      this.modifiers = this.validatEngineModiers(engine.modifiers);
    } catch (e) {
      throw new Error(e.errorMsg)
    }
  }

  public getApiURL() : string { return this.apiURL; }
  public getDocsURL() : string { return this.docsURL; }
  public getName() : string { return this.name; }
  public getID() : string { return this.id; }

  /**
   * getValidDelimiters() validates delimiter
   *
   * @param delim regex delimiter character to be validated
   * @returns an error message string if delimiter was invalid or
   *              empty string if it was valid
   */
  public getValidDelimiters (delim : IDelimPair): IValidatedDelimiters {
    let errorObj : IDelimModError = {
      invalidItems: [],
      message: ''
    }
    let isValid = true;
    let output: IDelimPair;

    if (this.allowedDelimiters.indexOf(delim.open) > -1) {
      const pairdDelim = this.pairdDelimiters.filter(pair => (pair.open === delim.open || pair.close === delim.close));
      output = (pairdDelim.length === 1) ? pairdDelim[0] : { open: delim.open, close: delim.open };
    } else {
      output = this.defaultDelimiters;
      isValid = false;

      errorObj.message = 'Delimiter "' + delim + '" is invalid. Delimiters must be one of the following: ' + this.makeHumanFriendly(this.allowedDelimiters);
    }

    return {
      delimiters: output,
      error: errorObj,
      valid: isValid
    }
  }

  public getDefaultDelimiters () : IDelimPair {
    return this.defaultDelimiters;
  }

  public setDefaultDelimiters(delimiters: IDelimPair) : true {
    const output = this.getValidDelimiters(delimiters);

    if (output.valid === false) {
      throw new Error(output.error.message);
    }
    return true;
  }

  public delimiterIsRequired () : boolean {
    return this.delimiterRequired;
  }



  /**
   * getValidModifiers() validates and de-dups regular expresson
   * modifiers
   *
   * @param modifiers regular expression modifiers (flags) characters
   * @returns string list of unique valid regular expression modifier
   *          characters
   */
  public getValidModifiers (modifiers : string) : IValidatedModifiers {
    let errorObj : IDelimModError = {
      invalidItems: [],
      message: ''
    }
    let validModifiers : string[] = [];
    let isValid = true;

    const output = modifiers.split('').filter(modifier => {
      if (this.modifiers.indexOf(modifier) >= 0) {
        if (validModifiers.indexOf(modifier) === -1) {
          // this is a new modifier so we'll keep it
          validModifiers.push(modifier);
          return true;
        } else {
          // we've seen this one before so dump it.
          return false;
        }
      } else {
        if (errorObj.invalidItems.indexOf(modifier) === -1) {
          // this is a new bad modifier lets record it.
          errorObj.invalidItems.push(modifier);
        }
        // it's bad so dump it.
        return false;
      }
    }).reduce((previousValue, modifier) => previousValue + modifier);

    if (errorObj.invalidItems.length > 0) {
      isValid = false;
      errorObj.message = 'The ' + this.modifiersName + ': ' + this.makeHumanFriendly(errorObj.invalidItems) + ' are invalid. Only the following ' + this.modifiersName + ' are valid: ' + this.makeHumanFriendly(this.modifiers);
    }

    return {
      error: errorObj,
      modifiers: output,
      valid: isValid
    }
  }

  public setDefaultModifiers(modifiers : string) : true {
    const output : IValidatedModifiers = this.getValidModifiers(modifiers);
    if (output.valid === false) {
      throw new Error(output.error.message);
    }
    this.defaultModifiers = output.modifiers;
    return true;
  }


  public abstract isValid(regex: string, modifiers: string, delimiters?: IDelimPair) : string;

  public abstract test(input: string[], regexes: IRegexPair[]) : IRegexTestResult[];

  public abstract replace(input: string[], regexes: IRegexPair[]) : string[];


  /**
   *
   * @param modifiers
   */
  protected validatEngineModiers (modifiers : string[]) : string[] {
    const validModRegex = new RegExp('^[a-z]$', 'i');
    const duds : string[] = [];
    const already: string[] = [];
    let output : string[] = [];

    output = modifiers.filter(modifier => {
      if (modifier.match(validModRegex)) {
        if (already.indexOf(modifier) === -1) {
          already.push(modifier);
          return true;
        }
      } else {
        duds.push(modifier);
      }
      return false
    });

    if (duds.length > 0 ) {
      const isAre = (duds.length === 1) ? 'is' : 'are';
      throw new Error('All ' + this.modifiersName + ' must be alphabetical characters. "' + this.makeHumanFriendly(duds) + '" ' + isAre + ' not valid');
    }

    return output;
  }

  /**
   * makeHumanFriendly() takes an array of strings and converts them
   * into a single, comma separated, quoted string
   *
   * e.g. ['a', 'b', 'c', 'd', 'e'] will be converted into
   *      '"a", "b", "c", "d" & "e"'
   *
   * Used for error reporting on invalid delimiters and modifiers
   *
   * @param items array of strings to be made human readable
   */
  protected makeHumanFriendly (items : string[]) : string {
    return items.reduce((previous, item, i, whole) => {
      const sep = i === 0 ? '' : (whole.length - 1 === i) ? '& ' : ', ';
      return previous + sep + '"' + item + '"';
    });
  }
}
