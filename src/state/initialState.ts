import { IRegexTestState } from "../typeDefinitions/state.defs";

export const initialState : IRegexTestState = {
  input: [],
  matches: [],
  output: '',
  regexPairs: [
    {
      delimiters: {
        close: '/',
        open: '/'
      },
      doReplaceOnTest: true,
      error: {
        error: null,
        valid: true
      },
      id: 0,
      lineCount: 1,
      longLine: false,
      modifiers: '',
      multiLine: false,
      regex: '',
      replace: '',
      transformEscapedWhiteSpace: true
    }
  ],
  settings: {
    autoTestOnBlur: false,
    defaultMultiLineCount: 3,
    defaultMultiLineRegex: false,
    doReplaceOnTest: true,
    maxSampleLength: 300,
    maxSubPatternLength: 300,
    overrideDelimiter: '/',
    regexEngineName: 'vanillaJS',
    regexUID: 0,
    showWhiteSpaceCharacters: false,
    whiteSpace: {
      joinString: '\n',
      split: false,
      splitPattern: '[\r\n]+',
      trim: false,
      trimBefore: false
    }
  }
}
