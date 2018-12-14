import { WHITE_SPACE } from '../actions/whiteSpace.action.js'

export const whiteSpaceReducer = (state = false, action) => {
  switch (action.type) {
    case WHITE_SPACE.SET_TRIM_BEFORE:
      return { ...state, trimBefore: action.payload }

    case WHITE_SPACE.SET_JOIN_STRING:
      return { ...state, joinString: action.payload }

    case WHITE_SPACE.SET_SPLIT:
      return { ...state, split: action.payload }

    case WHITE_SPACE.SET_SPLIT_PATTERN:
      return { ...state, trim: action.payload }

    case WHITE_SPACE.SET_TRIM:
      return { ...state, trim: action.payload }

    default:
      return state
  }
}
