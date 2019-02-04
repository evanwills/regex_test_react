import React from 'react'
import ReactDOM from 'react-dom'

export const DeleteRegex = (id: number, count: number) => {
  if (count > 1) {
    const ID = `regex-pair--{id}__delete`;
    return (
      <div className="regex-pair__extra__actions">
        <button className="regex-pair__delete" name={ID} id={ID}>
          Delete this regex
        </button>
      </div>
    )
  }
}
