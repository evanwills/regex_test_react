import React from 'react'
import ReactDOM from 'react-dom'

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
          {makeDelimiter(props.id, props.delimiter.value, props.pattern, props.delimiter.error)}
          <Checkbox labelID={key} value="1" 'transformWhitespaceCharacters', 'true', 'Transform escaped whitespace characters in replace string', props.transformEscapedWhiteSpace) />
          <Checkbox labelID={key} value="1" 'doReplaceOnTest', 'true', 'Do replace on test', props.doReplaceOnTest) />
        </div>
        {makeDeleteRegex(props.id, props.regexCount)}
        <OpenClose labelID={key} isOpen={false} />
      </footer>
    </article>
  );
};
