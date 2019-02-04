import React from 'react'
import ReactDOM from 'react-dom'

import { makeErrorMessage, getErrorMeta } from './makeErrorMsg'


export const makeModifiers = (id: number, modifiers: string, pattern: string, error: string = null) => {
  const errorMeta = getErrorMeta(id, error);
  return `
  <div className="regex-pair__modifiers{errorMeta.errorClass}">
    <label for="regex-pair--{id}__modifiers">Modifiers</label>
    <input type="text" className="regex-pair__input regex-pair__input--modifiers{errorMeta.errorClass}" name="regex-pair--{id}__modifiers" id="regex-pair--{id}__modifiers" value="{modifiers}" pattern="{pattern}" />
    {makeErrorMeassage(errorMeta.describedByID, error)}
  </div>`
}
