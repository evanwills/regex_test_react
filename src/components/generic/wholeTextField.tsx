import React from 'react';

import { ErrorMessage, getErrorMeta } from '../generic/errorMsg';
import { ErrorObj, WholeTextFieldProps } from '../generic/generic.typeDefs';
import { TextInputField, TextAreaField } from '../generic/text-field';
import { GenericTextFieldProps, AutoTextFieldProps, TextFieldTypes } from './generic.typeDefs'


export const WholeTextField = (props: WholeTextFieldProps) => {
  const {pairID, value, pattern, error} = props;
  const ID = 'regex-pair--' + pairID + '__delimiter';
  const fieldClassName = 'regex-pair__delimiter';
  const errorMeta = getErrorMeta(ID, error.errorMsg);

  return (
    <div className={props.className + errorMeta.errorClass}>
      <label htmlFor={props.ID}>Delimiter</label>
      {(props.fieldType === TextFieldTypes.input) ?  <TextInputField props={props.field} /> : <TextAreaField props={props.field} />}
      {(props.error !== null) ? <ErrorMessage errorMsg={error.errorMsg} describedByID={errorMeta.describedByID} classPrefix="regex-pair" />}
    </div>
  )
}

