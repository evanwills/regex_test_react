import React from 'react'
import ReactDOM from 'react-dom'

import { makeDelimiter } from './makeDelimiter';
import { makeModifiers } from './makeModifiers';
import { makeOpenClose } from './makeOpenClose';
import { makeCheckbox } from './makeCheckbox';
import { makeDeleteRegex } from './makeDeleteRegex';
import { makeFindReplace, makeRegexInput, makeRegexTextarea } from './makeFindReplace';

const regexPair = (props) => {
  let inputField;
  let mode = '';

  if (props.multiLineCount > 1) {
    inputField = makeRegexInput;
  } else {
    inputField = makeRegexTextarea;
    mode = ' regex-pair--multi-line';
  }
  const isOpen = (props.isOpen) ? ' regex-pair__extra--open' : '';

  return `
  <article id="regex-pair--{props.id}" className="regex-pair{mode}">
    <main className="regex-pair__main">
      {makeFindReplace(props.id, props.find.value, 'find', inputField, props.find.error)}
      {makeModifiers(props.id, props.modifiers.value, props.modifiers.pattern, props.modifiers.error)}
      {makeFindReplace(props.id, props.replace.value, 'replace', inputField, props.replace.error)}
      {makeOpenClose(props.id, true)}
    </main>
    <footer className="regex-pair__extra{isOpen}" id="regex-pair--{props.id}__extra">
      <div className="regex-pair__extra__inputs">
        {makeDelimiter(props.id, props.delimiter.value, props.pattern, props.delimiter.error)}
        {makeCheckbox(props.id, 'transformWhitespaceCharacters', 'true', 'Transform escaped whitespace characters in replace string', props.transformEscapedWhiteSpace)}
        {makeCheckbox(props.id, 'doReplaceOnTest', 'true', 'Do replace on test', props.doReplaceOnTest)}
      </div>
      {makeDeleteRegex(props.id, props.regexCount)}
      {makeOpenClose(props.id, false)}
    </footer>
  </article>
`;
};
