import React from 'react'

import { Delimiter } from './delimiter';
import { Modifiers } from './modifiers';
import { OpenClose } from './openClose';
import { Checkbox } from '../generic/Checkbox';
import { DeleteRegex } from './deleteRegex';
import { FindReplaceField } from './findReplace';
import { TextInputField, TextAreaField } from '../generic/text-field';

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

  return (
    <article key={key} className={mode}>
      <main className="regex-pair__main">
        <FindReplaceField pairID={key} value={props.find.value} findReplace='find' isInput={props.isInput} error={props.find.error} />
        <Modifiers labelID={key} modifiers={props.modifiers.value} pattern={ props.modifiers.pattern} error={props.modifiers.error} />
        <FindReplaceField pairID={key} value={props.replace.value} findReplace='replace' isInput={props.isInput} error={props.replace.error} />
        <OpenClose labelID={key} isOpen={true} />
      </main>
      <footer className={extraOpen}>
        <div className="regex-pair__extra__inputs">
          <Delimiter pairID={key} delimiter={props.delimiter.value} pattern={props.delimiter.pattern} error={props.delimiter.error} />
          <Checkbox labelID={'regex-pair--' + key + '__transformWhitespaceCharacters'} value="1" labelText="Transform escaped whitespace characters in replace string" isChecked={props.transformEscapedWhiteSpace} onChangeFunc={false} />
          <Checkbox labelID={'regex-pair--' + key + '__doReplaceOnTest'} value="1" labelText="Do replace on test" isChecked={props.doReplaceOnTest} onChangeFunc={false} />
        </div>
        <DeleteRegex labelID={key} count={props.regexCount} />
        <OpenClose labelID={key} isOpen={false} />
      </footer>
    </article>
  );
};
