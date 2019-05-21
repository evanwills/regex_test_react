import React from 'react';

import { ErrorMessage, getErrorMeta } from '../generic/errorMsg';
import { ErrorObj, WholeTextFieldProps } from '../generic/generic.typeDefs';
import { TextInputField, TextAreaField } from '../generic/text-field';
import { GenericTextFieldProps, AutoTextFieldProps, TextFieldTypes } from './generic.typeDefs'


export const WholeTextField = (props: WholeTextFieldProps) => {
  const {className, error, fieldType, field, ID, label} = props;
  const errorMeta = getErrorMeta(ID, error.errorMsg);

  return (
    <div className={props.className + errorMeta.errorClass}>
      <label htmlFor={props.ID}>{props.label}</label>
    </div>
  )
  // {(props.fieldType === TextFieldTypes.textarea) ? <TextInputField props={props.field} /> : <TextAreaField props={props.field} />}
  // {(props.error !== null) ? <ErrorMessage errorMsg={error.errorMsg} describedByID={errorMeta.describedByID} classPrefix="regex-pair" /> : ''}
}

