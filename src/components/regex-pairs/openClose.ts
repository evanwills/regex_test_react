import React from 'react'
import AccessibleButton from '../generic/button'

export const OpenClose = (id: number, isOpen: boolean = true, onClickFunc ) => {
  let mode = 'open';
  let btnText = 'Open';
  if (isOpen === true) {
    mode = 'close';
    btnText = 'Close';
  }

  const output ={
    btnText: btnText,
    labelID: 'regex-pair--' + id +'__extra-' + mode,
    fieldClass: 'regex-pair__open-close',
    onClickFunc: onClickFunc
  };

  return output;
}
