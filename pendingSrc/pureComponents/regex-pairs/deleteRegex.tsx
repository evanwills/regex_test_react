import React from 'react'
import AccessibleButton from '../generic/button'
import {DeleteRegexProps} from '../regex-pairs/pair.typeDefs'

export interface DeleteRegexProps {
  labelID: number,
  count: number,
  onClickFunc: CallableFunction
}

export const DeleteRegex = (props: DeleteRegexProps) => {
  if (props.count > 1) {
    const ID = 'regex-pair--' + props.labelID + '__delete';
    const dumb = false
    return (
      <div className="regex-pair__extra__actions">
        <AccessibleButton
          btnText="Delete this regex"
          labelID={ID}
          fieldClass="regex-pair__delete"
          disabled={false}
          readonly={false}
          value=""
           />
      </div>
    );
    // onClickFunc={props.onClickFunc}
  }
}

export default DeleteRegex
