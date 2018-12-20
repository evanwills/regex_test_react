export interface PairedDelimter {
  [index: string]: [string, string];
}

export interface DelimPair {
  open: string,
  close: string
}

export enum RegexType {
  local,
  remote
}

export interface RegexPair {
  delimiterClose?: string,
  delimiterOpen?: string,
  doReplaceOnTest: boolean,
  id: number,
  modifiers: string,
  regex: string,
  replace: string,
  transformWhitespaceCharacters: boolean
}

export interface RegexMatch {
  whole: string;
  parts: any
  position?: number
}

export interface RegexTestResult {
  error: ValidatedRegex,
  inputID: number,
  matches: Array<RegexMatch>,
  regexID: number,
  executionTime?: number
}

export interface ConstructedRegex {
  error: string,
  find: any,
  replace: string,
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

// export ReplacedInput: Array<string>

export interface ValidatedRegex {
  "valid": boolean,
  "error?": RegexError
}

export interface APIresponse {
  'ok': boolean,
  'code': number,
  'content': any,
  'returnType': string
}
