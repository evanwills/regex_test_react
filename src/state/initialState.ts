export const initialState = {
  autoTestOnBlur: false,
  defaultMultiLineRegex: false,
  defaultMultiLineCount: 3,
  doReplaceBeforeNext: true,
  input: [],
  maxSampleLength: 300,
  maxSubPatternLength: 300,
  output: '',
  overrideDelimiter: '/',
  regexEngine: null,
  regexEngineName: 'vanillaJS',
  regexID: 0,
  regexes: [
    {
      id: 0,
      pattern: '',
      replace: '',
      delimiter: '/',
      modifiers: '',
      isMultiLine: false,
      multiLineCount: 0,
      transformEscapedWhiteSpace: true,
      valid: true,
      error: {},
      matches: []
    }
  ],
  showWhiteSpaceCharacters: false,
  whiteSpace: {
    joinString: '\n',
    split: false,
    splitPattern: '[\r\n]+',
    trim: false,
    trimBefore: false
  }
}
