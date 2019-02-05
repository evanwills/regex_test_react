import React from 'react'
import AccessibleButton from '../generic/button'

export const DeleteRegex = ({labelID, count, onClickFunc}) => {
  if (count > 1) {
    const ID = 'regex-pair--' + labelID + '__delete';
    return (
      <div className="regex-pair__extra__actions">
        <AccessibleButton
          btnText="Delete this regex"
          labelID={ID}
          fieldClass="regex-pair__delete"
          onClickFunc={onClickFunc} />
      </div>
    )
  }
}
