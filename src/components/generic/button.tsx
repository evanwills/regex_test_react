import React from 'react'
import { AccessibleButtonProps } from './generic.typeDefs';

export const AccessibleButton = (props: AccessibleButtonProps) => {
  const {btnText, fieldID, fieldClass} = props;
  return (
    <button
      className={fieldClass}
      name={fieldID}
      id={fieldID}
      >
      {btnText}
    </button>
  );
  // onClick={onClickFunc}
};

export default AccessibleButton;
