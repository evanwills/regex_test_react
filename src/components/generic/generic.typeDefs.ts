
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

export interface AccessibleFieldProps {
  value: string,
  disabled: boolean,
  fieldClass: string,
  fieldID: string,
  // onClickFunc: CallableFunction,
  readonly: boolean
}

export interface AcccessibleCheckableFieldProps extends AccessibleFieldProps {
  isChecked: boolean,
  labelText: string
  // onChangeFunc: CallableFunction
}



export interface AccessibleButtonProps extends AccessibleFieldProps {
  btnText: string,
}

export interface TextBlockProps extends AccessibleFieldProps {
  pattern: string,
  describedByID: string,
  onKeyUpFunc: CallableFunction,
}

export interface GenericTextFieldProps extends AccessibleFieldProps {
  // describedByID: string,
  error: ErrorObj,
  fieldClass: string,
  pattern: string
  // onKeyUpFunc: CallableFunction,
}

export interface AutoTextFieldProps extends GenericTextFieldProps {
  height?: number
}

export interface WholeTextFieldProps {
  className: string
  error: ErrorObj,
  field: GenericTextFieldProps | AutoTextFieldProps,
  fieldType: TextFieldTypes,
  fieldID: string,
  label: string,
}

export enum AllFieldTypes {
  select,
  radio,
  checkbox,
  textarea,
  input
}
export enum TextFieldTypes {
  textarea,
  input
}
