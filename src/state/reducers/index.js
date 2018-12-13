import { combineReducers } from 'redux'
import { regexesReducer, regexIdReducer } from './regex.reducer.js'
import { whiteSpaceReducer } from './whiteSpace.reducer.js'

export const regexTestReducer = combineReducers({
  autoTestOnBlur: (state = false) => state,
  defaultMultiLineRegex: (state = false) => state,
  defaultMultiLineCount: (state = 3) => state,
  doReplaceBeforeNext: (state = true) => state,
  input: (state = '') => state,
  maxSampleLength: (state = 300) => state,
  maxSubPatternLength: (state = 300) => state,
  output: (state = '') => state,
  overRideDelimiter: (state = '/') => state,
  regexEngine: (state = 'vanillaJS') => state,
  regexID: regexIdReducer,
  regexes: regexesReducer,
  showWhiteSpaceCharacters: (state = false) => state,
  whiteSpace: whiteSpaceReducer
})
