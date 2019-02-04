import React from 'react'

export const ErrorMessage = ({describedByID, error}) => {
  if (error !== null) {
    return (
      <span id="{id}" className="regex-pair__error-msg">
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
