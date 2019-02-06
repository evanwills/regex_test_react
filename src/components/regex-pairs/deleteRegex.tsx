import React from 'react'
import AccessibleButton from '../generic/button'
import {DeleteRegexProps} from '../regex-pairs/pair.typeDefs'

export const DeleteRegex = (props: DeleteRegexProps) => {
  if (props.count > 1) {
    const ID = 'regex-pair--' + props.labelID + '__delete';
    return (
      <div className="regex-pair__extra__actions">
        <AccessibleButton
          btnText="Delete this regex"
          labelID={ID}
          fieldClass="regex-pair__delete"
          onClickFunc={props.onClickFunc} />
      </div>
    )
  }
}

export default DeleteRegex
