import React from 'react';
import { ErrorMessage, getErrorMeta } from '../generic/errorMsg';
import { ErrorObj } from '../generic/generic.typeDefs';
import { TextInputField } from '../generic/text-field';

interface DelimiterProps {
  pairID: number,
  value: string,
  pattern: string,
  error: ErrorObj,
  onKeyUpFunc: CallableFunction
}

// ==============================================
// Delimiter has two states


/**
 * Delimiter() renders a regex delimiter
 * @param props
 */


export const Delimiter = (props: DelimiterProps) => {
  const {pairID, value, pattern, error} = props;
  const ID = 'regex-pair--' + pairID + '__delimiter';
  const fieldClassName = 'regex-pair__delimiter';
  const errorMeta = getErrorMeta(ID, error.errorMsg);
  const PATTERN = '^' + pattern + '$';

  return (
    <div className={fieldClassName + errorMeta.errorClass}>
      <label htmlFor={ID}>Delimiter</label>
      <TextInputField
        labelID={ID}
        fieldClass={fieldClassName}
        value={value}
        pattern={PATTERN}
        describedByID={errorMeta.describedByID}
        disabled={false}
        onKeyUpFunc={function () {}} // this needs to be a redux action generator function.
        />
      <ErrorMessage errorMsg={error.errorMsg} describedByID={errorMeta.describedByID} classPrefix="regex-pair" />
    </div>
  );
}

export default Delimiter
