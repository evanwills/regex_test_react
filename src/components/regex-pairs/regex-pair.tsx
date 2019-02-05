import React from 'react'

import { Delimiter } from './delimiter';
import { Modifiers } from './modifiers';
import { OpenClose } from '../generic/openClose';
import { DeleteRegex } from './deleteRegex';
import { FindReplaceField } from './findReplace';
import Checkbox from '../generic/Checkbox';
import AccessibleButton from '../generic/button'

const RegexPair = (props, key) => {
  let isInput = true;
  let mode = 'regex-pair';
  let extraOpen = 'regex-pair__extra';
  const prefix = 'regex-pair--' + key;

  if (props.multiLineCount > 1) {
    isInput = false;
    mode += ' regex-pair--multi-line';
  }
  if (props.isOpen === true) {
    extraOpen += ' regex-pair__extra--open';
  }

  const dummyOnClick = (e) => {};

  return (
    <article key={key} className={mode}>
      <main className="regex-pair__main">
        <FindReplaceField pairID={key} value={props.find.value} findReplace='find' isInput={props.isInput} error={props.find.error} />
        <Modifiers labelID={key} modifiers={props.modifiers.value} pattern={ props.modifiers.pattern} error={props.modifiers.error} />
        <FindReplaceField pairID={key} value={props.replace.value} findReplace='replace' isInput={props.isInput} error={props.replace.error} />
        <AccessibleButton {...OpenClose(key, true, dummyOnClick)} />
      </main>
      <footer className={extraOpen}>
        <div className="regex-pair__extra__inputs">
          <Delimiter pairID={key} delimiter={props.delimiter.value} pattern={props.delimiter.pattern} error={props.delimiter.error} />
          <Checkbox labelID={'regex-pair--' + key + '__transformWhitespaceCharacters'} value="1" labelText="Transform escaped whitespace characters in replace string" isChecked={props.transformEscapedWhiteSpace} onChangeFunc={false} />
          <Checkbox labelID={'regex-pair--' + key + '__doReplaceOnTest'} value="1" labelText="Do replace on test" isChecked={props.doReplaceOnTest} onChangeFunc={dummyOnClick} />
        </div>
        <DeleteRegex labelID={key} count={props.regexCount} onClickFunc={dummyOnClick} />
        <AccessibleButton {...OpenClose(key, false, dummyOnClick)} />
      </footer>
    </article>
  );
};
