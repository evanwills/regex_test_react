export const initialState = {
  autoTestOnBlur: false,
  defaultMultiLineRegex: false,
  defaultMultiLineCount: 3,
  doReplaceBeforeNext: true,
  input: '',
  maxSampleLength: 300,
  maxSubPatternLength: 300,
  output: '',
  overRideDelimiter: '/',
  regexEngine: 'vanillaJS',
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
      result: []
    }
  ],
  showWhiteSpaceCharacters: false,
  whiteSpace: {
    before: false,
    joinString: '\n',
    split: false,
    splitPattern: '[\r\n]+',
    trim: false
  }
}
