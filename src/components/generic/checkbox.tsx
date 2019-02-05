import React from 'react'

const Checkbox = ({ labelID, value, labelText, isChecked, onChangeFunc }) => {
  return (
    <label className="label--checkbox">
      <input
        type="checkbox"
        name={labelID}
        value={value}
        checked={isChecked}
        onChange={onChangeFunc} />
      {labelText}
    </label>
  );
}

export default Checkbox;
