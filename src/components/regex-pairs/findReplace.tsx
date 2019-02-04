import React from 'react'
import { TextInputField, TextAreaField } from '../generic/text-field';
import { ErrorMessage, getErrorMeta } from './errorMsg'

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
  const ID = 'regex-pair--' + pairID +'__' + findReplace;
  const errorMeta = getErrorMeta(pairID, error);

  const inputProps = {
    labelID: ID,
    fieldName: 'regex-pair__' + findReplace,
    value: value,
    pattern: '',
    describedByID: errorMeta.describedByID,
    disabled: false,
    keyUpFunc: false // this needs to be a redux action generator function.
  }
  return (
    <div className="regex-pair__{findReplace}{errorMeta.errorClass}">
      <label for="regex-pair--id__{findReplace}">{labelStr}</label>
      {(isInput) ? <TextInputField {...inputProps} /> : <TextAreaField {...inputProps} />}
      <ErrorMessage describedByID={errorMeta.describedByID} error={error} />
    </div>
  );
};
