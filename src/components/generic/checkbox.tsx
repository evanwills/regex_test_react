import React from 'react'

export const Checkbox = ({ labelID, value, labelText, isChecked, onChangeFunc }) => {
  const ID = `regex-pair--{id}__{suffix}`;
  return (
    <label className="label--checkbox">
      <input type="checkbox" name={labelID} value={value} checked={isChecked} onchange={onChangeFunc} />
      {labelText}
    </label>
  );
}
