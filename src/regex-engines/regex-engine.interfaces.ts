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
  delimiterClose?: string
  delimiterOpen?: string,
  id: number,
  modifiers: string,
  regex: string,
  replace: string,
  transformWhitespaceCharacters: boolean
}

export interface RegexMatch {
  wholeMatch: string;
  matchedParts: Array<string>
}

export interface RegexTestResult {
  error: string,
  inputID: number,
  matches: Array<RegexMatch>,
  regexID: number
}

export interface ConstructedRegex {
  error: string,
  find: any,
  isGlobal: boolean
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
