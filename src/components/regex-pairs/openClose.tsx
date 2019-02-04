import React from 'react'
import ReactDOM from 'react-dom'

export const makeOpenClose = (id, isOpen = true) => {
  const mode = (isOpen) ? 'open' : 'close';
  return `
  <button className="regex-pair__open-close regex-pair__open-close--{mode}" name="regex-pair--{id}__extra-{mode}" id="regex-pair--{id}__extra-{mode}" data-id="{id}">Open</button>`
}
