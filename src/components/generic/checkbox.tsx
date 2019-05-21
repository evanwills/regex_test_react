import React from 'react'
import { AcccessibleCheckableFieldProps } from './generic.typeDefs'

const Checkbox = (props: AcccessibleCheckableFieldProps) => {
  return (
    <label className="label--checkbox">
      <input
        type="checkbox"
        name={props.fieldID}
        value={props.value}
        checked={props.isChecked} />
      {props.labelText}
    </label>
  );
  // onChange={props.onChangeFunc}
}

export default Checkbox;
