import React from 'react'
import { TextInputField, TextAreaField } from '../generic/text-field';
import { ErrorMessage, getErrorMeta } from '../generic/errorMsg'

// inferface FindReplaceFieldProps {
//   pairID: string,
//   value: string,
//   findReplace: string,
//   isInput: boolean,
//   error: string
// }

export const FindReplaceField = ({pairID, value, findReplace, isInput, error}) => {
  let labelStr = 'Replace';

  if (findReplace === 'find') {
    labelStr = 'Regex';
  } else {
    findReplace = 'replace'
  }
  if (isInput !== false) {
    isInput = true;
  }

  const fieldClass = 'regex-pair__' + findReplace;
  const ID = 'regex-pair--' + pairID +'__' + findReplace;
  const errorMeta = getErrorMeta(pairID, error);

  const inputProps = {
    labelID: ID,
    fieldClass: fieldClass,
    value: value,
    pattern: '',
    describedByID: errorMeta.describedByID,
    onKeyUpFunc: false, // this needs to be a redux action generator function.
    disabled: false
  }

  const wrapperClass = fieldClass + errorMeta.errorClass

  return (
    <div className={wrapperClass}>
      <label for={ID}>{labelStr}</label>
      {(isInput) ? <TextInputField {...inputProps} /> : <TextAreaField {...inputProps} />}
      <ErrorMessage describedByID={errorMeta.describedByID} errorMsg={error} classPrefix="regex-pair" />
    </div>
  );
};
