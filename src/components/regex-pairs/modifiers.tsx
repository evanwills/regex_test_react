import React from 'react'
import { TextInputField } from '../generic/text-field';
import { ErrorMessage, getErrorMeta } from '../generic/errorMsg'


export const Modifiers = ({ labelID, modifiers, pattern, error }) => {
  const ID = 'regex-pair--' + labelID + '__modifiers';
  const fieldClass = 'regex-pair__modifiers';
  const PATTERN = '^' + pattern + '$';
  const errorMeta = getErrorMeta(labelID, error);
  const wrapperClass = fieldClass + errorMeta.errorClass;

  return (
    <div className={wrapperClass}>
      <label for={ID}>Modifiers</label>
      <TextInputField
        labelID={ID}
        fieldClass={fieldClass + '__input'}
        value={modifiers}
        pattern={PATTERN}
        describedByID={errorMeta.describedByID}
        disabled={false}
        onKeyUpFunc={false} // this needs to be a redux action generator function.
        />
      <ErrorMessage errorMsg={error} describedByID={errorMeta.describedByID} classPrefix="regex-pair" />
    </div>
  )
}
