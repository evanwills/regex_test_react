import React from 'react'
import ReactDOM from 'react-dom'

export const makeCheckbox = (id: number, suffix: string, value: string, labelText: string, isChecked: boolean = false) => {
  return `
      <label className="label--checkbox">
        <input type="checkbox" name="regex-pair--{id}__{suffix}" id=" regex-pair--{id}__{suffix}" value="{value}" {(isChecked) ? checked="checked" :} />
        {labelText}
      </label>`;
}
