import React from 'react'
import ReactDOM from 'react-dom'

export const makeDeleteRegex = (id: number, count: number) => {
  if (count > 1) {
    return `  <div className="regex-pair__extra__actions">
      <button className="regex-pair__delete" name="regex-pair--{id}__delete" id="regex-pair--{id}__delete">Delete this regex</button>
    </div>`
  } else {
    return '';
  }
}
