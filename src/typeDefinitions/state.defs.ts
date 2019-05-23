import { IRegexPair, IRegexTestResult } from '../regex-engines/regex-engine.interfaces';


export interface IWhiteSpace {
  split: boolean,
  splitPattern: string,
  trim: boolean,
  trimBefore: boolean
}

export interface ISettings {
  autoTestOnBlur: boolean,
  defaultMultiLineRegex: boolean,
  defaultMultiLineCount: number,
  doReplaceOnTest: boolean,
  maxSampleLength: number,
  maxSubPatternLength: number,
  overrideDelimiter: string,
  // regexEngine: null,
  regexEngineName: string,
  regexUID: number,
  showWhiteSpaceCharacters: boolean,
  whiteSpace: IWhiteSpace
}


export interface IRegexTestState {
  input: string[],
  matches: IRegexTestResult[]
  output: string,
  regexPairs: IRegexPair[],
  settings: ISettings
}
