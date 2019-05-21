import React from 'react'
import { TextInputField, TextAreaField } from '../generic/text-field';
import { ErrorMessage, getErrorMeta } from '../generic/errorMsg'
import { FindReplaceFieldProps } from './pair.typeDefs'

// inferface FindReplaceFieldProps {
//   pairID: string,
//   value: string,
//   findReplace: string,
//   isInput: boolean,
//   error: string
// }

/**
 * FindReplaceField() returns a single (accessible input field) for either a find or replace field in a regex pair
 * @param props
 */
export const FindReplaceField = (props: FindReplaceFieldProps) => {
  const {pairID, value, findReplace, isInput, error} = props

  let labelStr = 'Replace';
  let _findReplace = findReplace;

  if (_findReplace === 'find') {
    labelStr = 'Regex';
  } else {
    _findReplace = 'replace'
  }

  const fieldClass = 'regex-pair__' + _findReplace;
  const ID = 'regex-pair--' + pairID +'__' + _findReplace;
  const errorMeta = getErrorMeta(ID, error.errorMsg);

  const inputProps = {
    fieldID: ID,
    fieldClass: fieldClass,
    value: value,
    pattern: '',
    describedByID: errorMeta.describedByID,
    onKeyUpFunc: function () {}, // this needs to be a redux action generator function.
    disabled: false
  }

  const wrapperClass = fieldClass + errorMeta.errorClass

  return (
    <div className={wrapperClass}>
      <label htmlFor={ID}>{labelStr}</label>
      {(isInput) ? <TextInputField {...inputProps} /> : <TextAreaField {...inputProps} />}
      <ErrorMessage describedByID={errorMeta.describedByID} errorMsg={error} classPrefix="regex-pair" />
    </div>
  );
};

export default FindReplaceField
