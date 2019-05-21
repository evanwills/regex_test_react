import {RegexEngine} from './regex-engine.class'
import {DelimPair, RegexPair, RegexTestResult} from './regex-engine.interfaces'


export class RemoteRegex extends RegexEngine {
  public isValid(regex: string, modifiers: string, delimiters?: DelimPair) : string {
    let output = '';
    return output;
  }

  public test(input: Array<string>, regexes: Array<RegexPair>) : Array<RegexTestResult> {
    let output : Array<RegexTestResult> = [];
    return output;
  }

  public replace(input: Array<string>, regexes: Array<RegexPair>) : Array<string> {
    let output : Array<string> = [];
    return output;
  }
}
