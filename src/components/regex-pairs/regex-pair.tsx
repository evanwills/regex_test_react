import React from 'react'

import { RegexPairProps } from './pair.typeDefs';
import { AccessibleButtonProps } from '../generic/generic.typeDefs';

import Delimiter from './delimiter';
import Modifiers from './modifiers';
import DeleteRegex from './deleteRegex';
import FindReplaceField from './findReplace';
import Checkbox from '../generic/Checkbox';
import AccessibleButton from '../generic/button';

const OpenClose = (id: number, isOpen: boolean = true, onClickFunc: CallableFunction ) : AccessibleButtonProps => {
  let mode = 'open';
  let btnText = 'Open';
  if (isOpen === true) {
    mode = 'close';
    btnText = 'Close';
  }

  const output = {
    btnText: btnText,
    fieldID: 'regex-pair--' + id +'__extra-' + mode,
    fieldClass: 'regex-pair__open-close',
    onClickFunc: onClickFunc
  };

  return output;
}

const RegexPair = (props: RegexPairProps, key: number) => {
  let isInput = true;
  let mode = 'regex-pair';
  let extraOpen = 'regex-pair__extra';
  const prefix = 'regex-pair--' + key;

  const { find, replace, delimiter, modifiers, multiLineCount, doReplaceOnTest, isOpen, transformEscapedWhiteSpace, regexCount } = props

  if (multiLineCount > 1) {
    isInput = false;
    mode += ' regex-pair--multi-line';
  }
  if (isOpen === true) {
    extraOpen += ' regex-pair__extra--open';
  }
  const hasError = (find.error !== null);

  const dummyOnClick = (e) => {};

  return (
    <article key={key} className={mode}>
      <main className="regex-pair__main">
        <FindReplaceField
          pairID={key}
          value={find.value}
          findReplace='find'
          isInput={isInput}
          error={find.error} />
        <Modifiers
          fieldID={key}
          modifiers={modifiers.value}
          pattern={modifiers.pattern}
          error={modifiers.error} />
        <FindReplaceField
          pairID={key}
          value={replace.value}
          findReplace='replace'
          isInput={isInput}
          error={null} />
        <AccessibleButton {...OpenClose(key, true, dummyOnClick)} />
      </main>
      <footer className={extraOpen}>
        <div className="regex-pair__extra__inputs">
          <Delimiter
            pairID={key}
            value={delimiter.value}
            pattern={delimiter.pattern}
            error={delimiter.error}
            onKeyUpFunc={dummyOnClick} />
          <Checkbox
            fieldID={'regex-pair--' + key + '__transformWhitespaceCharacters'}
            value="1"
            labelText="Transform escaped whitespace characters in replace string"
            isChecked={transformEscapedWhiteSpace}
            onChangeFunc={false} />
          <Checkbox
            fieldID={'regex-pair--' + key + '__doReplaceOnTest'}
            value="1"
            labelText="Do replace on test"
            isChecked={doReplaceOnTest}
            onChangeFunc={dummyOnClick} />
        </div>
        <DeleteRegex
          fieldID={key}
          count={regexCount}
          onClickFunc={dummyOnClick} />
        <AccessibleButton {...OpenClose(key, false, dummyOnClick)} />
      </footer>
    </article>
  );
};

export default RegexPair;
