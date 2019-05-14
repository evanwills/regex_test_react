import React from 'react'
import { TextInputField } from '../generic/text-field';
import { ErrorMessage, getErrorMeta } from '../generic/errorMsg'
import { ModifiersProps } from './pair.typeDefs';

const modifiersOnChange = (key: number, field: string) => {
  return (e: Event) => {

  };
};


export const Modifiers = (props: ModifiersProps) => {
  const { labelID, modifiers, pattern, error } = props;
  const ID = 'regex-pair--' + labelID + '__modifiers';
  const fieldClass = 'regex-pair__modifiers';
  const PATTERN = '^' + pattern + '$';
  const errorMeta = getErrorMeta(ID, error);
  const wrapperClass = fieldClass + errorMeta.errorClass;
  let extraAttrs = {};

  if (error !== null) {
    extraAttrs['describedByID']
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={ID}>Modifiers</label>
      <TextInputField
        labelID={ID}
        fieldClass={fieldClass + '__input'}
        value={modifiers}
        pattern={PATTERN}
        describedByID={errorMeta.describedByID}
        disabled={false}
        onKeyUpFunc={modifiersOnChange} // this needs to be a redux action generator function.
        />
      <ErrorMessage errorMsg={error} describedByID={errorMeta.describedByID} classPrefix="regex-pair" />
    </div>
  )
}

export default Modifiers
