import React from 'react'

const getDynamicAttrs = (pattern: string, describedByID: string, disabled: boolean) => {
  let output = {};

  if (describedByID !== '') {
    output['aria-described-by'] = describedByID;
  }
  if (pattern !== '') {
    output['pattern'] = pattern;
  }
  if (disabled === true) {
    output['disabled'] = disabled;
  }
}

export const TextInputField = ({ labelID, fieldClass, value, pattern, describedByID, onKeyUpFunc, disabled }) => {
  const attrs = getDynamicAttrs(pattern, describedByID, disabled);

  return (
      <input
        type="text"
        className={fieldClass}
        id={labelID}
        name={labelID}
        value={value}
        {...attrs}
        onkeyup={onKeyUpFunc} />
    );
}

export const TextAreaField = ({ labelID, fieldClass, value, pattern, describedByID, onKeyUpFunc, disabled }) => {
  const attrs = getDynamicAttrs(pattern, describedByID, disabled);

  return (
      <textarea
        className={fieldClass}
        id={labelID}
        name={labelID}
        {...attrs}
        onkeyup={onKeyUpFunc}>
        {value}
      </textarea>
    );
}
