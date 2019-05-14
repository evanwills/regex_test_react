
export interface ErrorObj {
  errorMsg: string,
  startPos: number,
  problemChar: string
}

export interface TextInput {
  value: string,
  pattern: string,
  errorMsg?: ErrorObj
}

export interface AccessibleButtonProps {
  btnText: string,
  labelID: string,
  fieldClass: string,
  onClickFunc: CallableFunction
}

export interface TextBlockProps {
  labelID: number,
  value: string,
  pattern: string,
  describedByID: string,
  onKeyUpFunc: CallableFunction,
  disabled: boolean
}

export interface GenericTextFieldProps {
  labelID: string,
  fieldClass: string,
  value: string,
  pattern: string,
  describedByID: string,
  onKeyUpFunc: CallableFunction,
  disabled: boolean
}

export interface AutoTextFieldProps extends GenericTextFieldProps {
  height?: number
}