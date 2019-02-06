import { TextInput, ErrorObj } from '../generic/generic.typeDefs'

export interface RegexPairProps {
  find: TextInput,
  replace: string,
  delimiter: TextInput,
  modifiers: TextInput,
  multiLineCount: number,
  doReplaceOnTest: boolean,
  isOpen: boolean,
  transformEscapedWhiteSpace: boolean,
  valid: boolean,
  error: ErrorObj,
  regexCount: number
}

export interface FindReplaceFieldProps {
  pairID: number,
  value: string,
  findReplace: string,
  isInput: boolean,
  error: string
}

export interface DeleteRegexProps {
  labelID: string,
  count: number,
  onClickFunc: CallableFunction
}
