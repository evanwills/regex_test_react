export interface APIresponse {
  'ok': boolean,
  'code': number,
  'content': any,
  'returnType': string
}

export interface ConstructedRegex {
  error: ValidatedRegex,
  find: any,
  regexID: number,
  replace: string
}

export interface DelimPair {
  open: string,
  close: string
}

export interface PairedDelimter {
  [index: string]: [string, string];
}

export interface Regex {
  delimiterClose?: string,
  delimiterOpen?: string,
  modifiers: string,
  regex: string,
}

export interface RegexConfig {
  "id": string,
  "apiURL": string,
  "defaultDelimiter": string,
  "delimiterRequired": boolean,
  "docsURL": string,
  "modifiers": Array<string>,
  "name": string,
  "pairedDelimiters"?: PairedDelimter,
  "type": RegexType
}

export interface RegexError {
  "rawMessage": string,
  "message": string,
  "offset": number,
  "badCharacter": string,
  "regexID"?: number
}

export interface RegexMatch {
  whole: string;
  parts: any
  position?: number
}

export interface RegexPair extends Regex {
  doReplaceOnTest: boolean,
  id: number,
  replace: string,
  transformWhitespaceCharacters: boolean
}

export interface regexTestGlobal {
  matches: Array<RegexMatch>,
  execTime: number
}

export interface RegexTestResult {
  error: ValidatedRegex,
  executionTime?: number,
  inputID: number,
  matches: Array<RegexMatch>,
  regexID: number
}

export enum RegexType {
  local,
  remote
}

// export ReplacedInput: Array<string>

export interface ValidatedRegex {
  valid: boolean,
  error: RegexError | null
}

export interface RegexIsValid extends ValidatedRegex {
  valid: true
  error: null
}
export interface RegexIsInValid extends ValidatedRegex {
  valid: false
  error: RegexError
}
