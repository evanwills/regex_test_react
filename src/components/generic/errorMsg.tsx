import React from 'react'

export const ErrorMessage = ({errorMsg, describedByID, classPrefix}) => {
  if (errorMsg !== null) {
    return (
      <span id={describedByID} className={classPrefix + '__error-msg'}>
        {errorMsg}
      </span>
    );
  }
};

export const getErrorMeta = (labelID: string, errorMsg: string = null) => {
  let output = {
    errorClass: '',
    describedBy: '',
    describedByID: '',
    hasError: false
  };

  if (errorMsg !== null) {
    let describedByID = labelID + '--error';
    output.errorClass = ' has-error';
    output.describedByID = describedByID;
    output.describedBy = ' aria-described-by="' + describedByID + '"';
    output.hasError = true;
  }

  return output;
};
