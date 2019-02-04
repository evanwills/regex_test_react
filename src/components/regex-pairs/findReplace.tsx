import React from 'react'
import ReactDOM from 'react-dom'

import { makeErrorMessage, getErrorMeta } from './makeErrorMsg'


export const makeRegexInput = (id: number, value: string, findReplace: string = 'find', describedBy: string = '') => {
  return `<input type="text" className="regex-pair__input regex-pair__input--{findReplace}{errorMeta.errorClass}" name="regex-pair--{id}__{findReplace}" id="regex-pair--{id}__{findReplace}" value="{value}"{describedBy} />`
};

export const makeRegexTextarea = (id: number, value: string, findReplace: string = 'find', describedBy: string = '') => {
  return `<textarea className="regex-pair__input regex-pair__input--{findReplace}{errorMeta.errorClass}" name="regex-pair--{id}__{findReplace}" id="regex-pair--{id}__{findReplace}"{describedBy}>{value}</textarea>`
};

export const makeFindReplace = (id, value, findReplace, field, error: string = null) => {
  let labelStr = 'Replace';
  if (findReplace === 'find') {
    labelStr = 'Regex';
  }
  const errorMeta = getErrorMeta(id, error);
  return `
  <div className="regex-pair__{findReplace}{errorMeta.errorClass}">
    <label for="regex-pair--id__{findReplace}">{labelStr}</label>
    {field(id, value, findReplace, errorMeta.describedBy)}
    {makeErrorMeassage(errorMeta.describedByID, error)}
  </div>`
};
