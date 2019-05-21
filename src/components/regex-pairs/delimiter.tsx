import React from 'react';
import { ErrorMessage, getErrorMeta } from '../generic/errorMsg';
import { ErrorObj } from '../generic/generic.typeDefs';
import { TextInputField } from '../generic/text-field';
import { WholeTextField } from '../generic/wholeTextField';
import { TextFieldTypes, GenericTextFieldProps } from '../generic/generic.typeDefs'
import { prependOnceListener } from 'cluster';

interface DelimiterProps {
  pairID: number,
  value: string,
  pattern: string,
  error: ErrorObj
  // onKeyUpFunc: CallableFunction
}

// ==============================================
// Delimiter has two states


/**
 * Delimiter() renders a regex delimiter
 * @param props
 */


export const Delimiter = (props: DelimiterProps) => {
  // const {pairID, value, pattern, error} = props;
  const ID = 'regex-pair--' + props.pairID + '__delimiter';
  const fieldClassName = 'regex-pair__delimiter';
  let regex = '';
  let disabled = true

  if (props.pattern === '') {
    regex = '^' + props.pattern + '$';
    disabled = false;
  }

  const fieldProps : GenericTextFieldProps = {
    value: props.value,
    pattern: regex,
    fieldID: ID,
    error: props.error,
    fieldClass: '',
    disabled: disabled,
    readonly: false
  }

  return (
    <WholeTextField
      className={fieldClassName}
      error={props.error}
      field={fieldProps}
      fieldID={ID}
      fieldType={TextFieldTypes.input}

     />
  );
}

export default Delimiter
