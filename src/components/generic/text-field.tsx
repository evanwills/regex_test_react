import React from 'react'

export const TextInputField = ({ labelID, fieldName, value, pattern, describedByID, keyUpFunc, disabled }) => {
  let attrs = {};

  if (typeof describedByID !== 'undefined' && describedByID !== '') {
    attrs['aria-described-by'] = describedByID;
  }
  if (typeof pattern !== 'undefined' && pattern !== '') {
    attrs['pattern'] = pattern;
  }
  if (typeof disabled !== 'undefined' && disabled !== '') {
    attrs['disabled'] = disabled;
  }

  return (
      <input type="text" className={fieldName}
        name={labelID}
        value={value}
        {...attrs}
        onkeyup={keyUpFunc} />
    );
}

export const TextAreaField = ({ labelID, fieldName, value, pattern, describedByID, keyUpFunc, disabled }) => {
  let attrs = {};

  if (typeof describedByID !== 'undefined' && describedByID !== '') {
    attrs['aria-described-by'] = describedByID;
  }
  if (typeof pattern !== 'undefined' && pattern !== '') {
    attrs['pattern'] = pattern;
  }
  if (typeof disabled !== 'undefined' && disabled !== '') {
    attrs['disabled'] = disabled;
  }

  return (
      <textarea className={fieldName} name={labelID} {...attrs} onkeyup={keyUpFunc}>
        {value}
      </textarea>
    );
}
