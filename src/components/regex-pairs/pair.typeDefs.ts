import { TextInput, ErrorObj } from '../generic/generic.typeDefs'
import { ErrorMessage } from '../generic/errorMsg';

export interface RegexPairProps {
  find: WholeTextFieldProps,
  replace: WholeTextFieldProps,
  delimiter: WholeTextFieldProps,
  modifiers: WholeTextFieldProps,
  multiLineCount: number,
  doReplaceOnTest: boolean,
  idDeletable: boolean;
  isOpen: boolean,
  transformEscapedWhiteSpace: boolean,
  valid: boolean,
  ErrorMessage: boolean,
  regexCount: number
}

export interface FindReplaceFieldProps {
  pairID: number,
  value: string,
  findReplace: string,
  isInput: boolean,
  error?: ErrorObj
}

export interface DeleteRegexProps {
  labelID: number,
  count: number,
  onClickFunc: CallableFunction
}

export interface ModifiersProps {
  error?: ErrorObj,
  labelID: number,
  modifiers: string,
  pattern: string
}

export interface WholeTextFieldProps {
  value: string,
  pattern: string
  error?: ErrorObj
}
