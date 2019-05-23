export interface IAPIresponse {
  ok: boolean,
  code: number,
  content: any,
  returnType: string
}

export interface IConstructedRegex {
  error: IValidatedRegex,
  find: any,
  regexID: number,
  replace: string
}

export interface IDelimPair {
  open: string,
  close: string
}

export interface IRegex {
  delimiters: IDelimPair
  modifiers: string,
  regex: string,
  error: IValidatedRegex
}

export interface IRegexPair extends IRegex {
  doReplaceOnTest: boolean,
  id: number,
  replace: string,
  transformEscapedWhiteSpace: boolean,
  longLine: boolean,
  multiLine: boolean,
  lineCount: number
}

export interface IRegexError {
  rawMessage: string,
  message: string,
  offset: number,
  badCharacter: string,
  regexID?: number
}

export interface IRegexMatch {
  whole: string;
  parts: any
  position?: number
}

export interface IRegexTestGlobal {
  matches: IRegexMatch[],
  execTime: number
}

export interface IRegexTestResult {
  error: IValidatedRegex,
  executionTime?: number,
  inputID: number,
  matches: IRegexMatch[],
  regexID: number
}

export interface IDelimModError {
  invalidItems: string[],
  message: string
}

export interface IValidatedModDelim {
  error: IDelimModError,
  valid: boolean
}
export interface IValidatedModifiers extends IValidatedModDelim {
  modifiers: string
}
export interface IValidatedDelimiters extends IValidatedModDelim {
  delimiters: IDelimPair
}

// export ReplacedInput: Array<string>

export interface IValidatedRegex {
  error: IRegexError | null,
  valid: boolean
}

export interface IRegexIsValid extends IValidatedRegex {
  error: null,
  valid: true
}
export interface IRegexIsInValid extends IValidatedRegex {
  error: IRegexError,
  valid: false
}

export enum engineAccess {
  local,
  remote
}

export enum flagsModifiers {
  flags,
  modifiers
}

export interface IRegexConfig {
  allowedDelimiters: string[],
  apiURL: string,
  defaultDelimiters: IDelimPair,
  defaultModifiers: string,
  delimiterRequired: boolean,
  docsURL: string,
  id: string,
  modifiers: string[],
  modifiersName: flagsModifiers,
  name: string,
  pairedDelimiters: IDelimPair[]
  type: engineAccess
}
