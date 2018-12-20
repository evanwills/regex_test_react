import { combineReducers } from 'redux'
import { regexesReducer, regexIdReducer } from './regex.reducer'
import { whiteSpaceReducer } from './whiteSpace.reducer'

export const regexTestReducer = combineReducers({
  autoTestOnBlur: (state:boolean = false) => state,
  defaultMultiLineRegex: (state:boolean = false) => state,
  defaultMultiLineCount: (state:number = 3) => state,
  doReplaceOnTest: (state:boolean = true) => state,
  input: (state:string = '') => state,
  maxSampleLength: (state:number = 300) => state,
  maxSubPatternLength: (state:number = 300) => state,
  output: (state:string = '') => state,
  overrideDelimiter: (state:string = '/') => state,
  regexEngine: (state:string = 'vanillaJS') => state,
  regexID: regexIdReducer,
  regexes: regexesReducer,
  showWhiteSpaceCharacters: (state:boolean = false) => state,
  whiteSpace: whiteSpaceReducer
})
