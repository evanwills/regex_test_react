import React from 'react'

export const ErrorMessage = ({error, describedByID, classPrefix}) => {
  if (error !== null) {
    return (
      <span id={describedByID} className={classPrefix + '__error-msg'}>
        {error}
      </span>
    );
  }
};

export const getErrorMeta = (labelID: string, error: string = null) => {
  let output = {
    errorClass: '',
    describedBy: '',
    describedByID: '',
    hasError: false
  };

  if (error !== null) {
    let describedByID = labelID + '--error';
    output.errorClass = ' has-error';
    output.describedByID = describedByID;
    output.describedBy = ' aria-described-by="' + describedByID + '"';
    output.hasError = true;
  }
  return output;
};
  