import React from 'react';
import { ErrorMessage, getErrorMeta} from './errorMsg';
import { TextInputField } from '../generic/text-field';



export const Delimiter = ({pairID, delimiter, pattern, error}) => {
  const ID = `regex-pair--{id}__delimiter`;
  const errorMeta = getErrorMeta(ID, error);
  const PATTERN = '^' + pattern + '$';
  return (
        <div className="regex-pair__delimiter{errorMeta.errorClass}">
          <label for="regex-pair--{id}__delimiter">Delimiter</label>
          <TextInputField
            labelID={ID}
            fieldName="regex-pair__delimiter"
            value={delimiter}
            pattern={PATTERN}
            describedByID={errorMeta.describedByID}
            disabled={false}
            keyUpFunc={false} // this needs to be a redux action generator function.
            />
          <ErrorMessage describedByID={errorMeta.describedByID} error={error} />
        </div>
  );
}

// <ErrorMessage describedByID={ID} errorMsg={error} />
