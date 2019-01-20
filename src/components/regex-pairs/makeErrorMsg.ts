import React from 'react'
import ReactDOM from 'react-dom'

export const makeErrorMessage = (id: number, error: string) => {
  if (error !== null) {
    return `<span id="{id}" className="regex-pair__error-msg">{error}</span>`;
  } else {
    return ``;
  }
};

export const getErrorMeta = (id: number, error: string = null) => {
  let output = {
    errorClass: '',
    describedBy: '',
    describedByID: ''
  };

  if (error !== null) {
    let describedByID = 'regex-pair--' + id + '__delimiter--error';
    output.errorClass = ' has-error';
    output.describedByID = describedByID;
    output.describedBy = 'described-by="' + describedByID + '"';
  }
  return output;
};
