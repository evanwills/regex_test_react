import React from 'react'
import { TextInputField } from '../generic/text-field';
import { ErrorMessage, getErrorMeta } from './errorMsg'


export const Modifiers = ({ labelID, modifiers, pattern, error }) => {
  const ID = 'regex-pair--' + labelID + '__modifiers';
  const PATTERN = '^' + pattern + '$';
  const errorMeta = getErrorMeta(labelID, error);
  return (
    <div className="regex-pair__modifiers{errorMeta.errorClass}">
      <label for={ID}>Modifiers</label>
      <TextInputField
        labelID={ID}
        fieldName="regex-pair__delimiter"
        value={modifiers}
        pattern={PATTERN}
        describedByID={errorMeta.describedByID}
        disabled={false}
        keyUpFunc={false} // this needs to be a redux action generator function.
        />
      <ErrorMessage describedByID={errorMeta.describedByID} error={error} />
    </div>
  )
}
