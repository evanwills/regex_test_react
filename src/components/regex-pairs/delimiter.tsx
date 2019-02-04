import React from 'react'
import ReactDOM from 'react-dom'

import { makeErrorMessage, getErrorMeta } from './makeErrorMsg'


export const makeDelimiter = (id: number, delimiter: string, pattern: string, error: string = null) => {
  const errorMeta = getErrorMeta(id, error);
  return `
        <div className="regex-pair__delimiter{errorMeta.errorClass}">
          <label for="regex-pair--{id}__delimiter">Delimiter</label>
          <input type="text" className="regex-pair__delimiter{errorMeta.errorClass}"
                 name="regex-pair--{id}__delimiter"
                 id="regex-pair--{id}__delimiter"
                 value="{delimiter}"
                 pattern="^{pattern}$"
                 {errorMeta.describedBy} />
          {makeErrorMessage(errorMeta.describedByID, error)}
        </div>
  `;
}
