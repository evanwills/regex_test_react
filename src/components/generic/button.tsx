import React from 'react'

const AccessibleButton = ({btnText, labelID, fieldClass, onClickFunc}) => {
  return (
    <button className={fieldClass} name={labelID} id={labelID} onClick={onClickFunc}>
      {btnText}
    </button>
  )
}

export default AccessibleButton
