import React from 'react'

interface ErrorMessageProps {
  errorMsg: string,
  describedByID: string,
  classPrefix: string
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  if (props.errorMsg !== null) {
    return (
      <span id={props.describedByID} className={props.classPrefix + '__error-msg'}>
        {props.errorMsg}
      </span>
    );
  } else {
    return null;
  }
};

export const getErrorMeta = (fieldID: string, errorMsg: string = '') => {
  let output = {
    errorClass: '',
    describedBy: '',
    describedByID: '',
    hasError: false
  };

  if (errorMsg !== null) {
    let describedByID = fieldID + '--error';
    output.errorClass = ' has-error';
    output.describedByID = describedByID;
    output.describedBy = ' aria-described-by="' + describedByID + '"';
    output.hasError = true;
  }

  return output;
};
