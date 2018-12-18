import { combineReducers } from 'redux'
import { WHITE_SPACE } from '../actions/whiteSpace.action'

const setTrimBefore = (state: boolean = false, action) => {
  if (action.type === WHITE_SPACE.SET_TRIM_BEFORE) {
    return action.payload
  } else {
    return state
  }
}

const setJoinString = (state: string = "\n", action) => {
  if (action.type === WHITE_SPACE.SET_JOIN_STRING) {
    return action.payload
  } else {
    return state
  }
}

const setSplit = (state: boolean = false, action) => {
  if (action.type === WHITE_SPACE.SET_SPLIT) {
    return action.payload
  } else {
    return state
  }
}

const setSplitPattern = (state: string = '[\r\n]+', action) => {
  if (action.type === WHITE_SPACE.SET_SPLIT_PATTERN) {
    return action.payload
  } else {
    return state
  }
}

const setTrim = (state: boolean = false, action) => {
  if (action.type === WHITE_SPACE.SET_TRIM) {
    return action.payload
  } else {
    return state
  }
}

export const whiteSpaceReducer = combineReducers({
  joinString: setJoinString,
  split: setSplit,
  splitPattern: setSplitPattern,
  trim: setTrim,
  trimBefore: setTrimBefore
})
