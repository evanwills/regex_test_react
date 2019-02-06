import React from 'react';
import { ErrorMessage, getErrorMeta} from '../generic/errorMsg';
import { TextInputField } from '../generic/text-field';



export const Delimiter = ({pairID, delimiter, pattern, error}) => {
  const ID = 'regex-pair--' + pairID + '__delimiter';
  const fieldClassName = 'regex-pair__delimiter';
  const errorMeta = getErrorMeta(ID, error);
  const PATTERN = '^' + pattern + '$';

  return (
        <div className={fieldClassName + errorMeta.errorClass}>
          <label htmlFor={ID}>Delimiter</label>
          <TextInputField
            labelID={ID}
            fieldClass={fieldClassName}
            value={delimiter}
            pattern={PATTERN}
            describedByID={errorMeta.describedByID}
            disabled={false}
            onKeyUpFunc={false} // this needs to be a redux action generator function.
            />
          <ErrorMessage errorMsg={error} describedByID={errorMeta.describedByID} classPrefix="regex-pair" />
        </div>
  );
}

export default Delimiter
