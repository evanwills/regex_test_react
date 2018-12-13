import { REGEX } from '../actions/regex.action.js'

const regexAddNew = (state, action) => {
  const getIndex = (_accum, item, index) => {
    if (item.id === action.meta.id) {
      _accum = index
    }
    return _accum
  }
  const i = state.reduce(getIndex, -1)

  if (i === -1) {
    return state.concat(action.payload)
  } else {
    const j = (action.meta.after) ? i + 1 : i
    return state.splice(j, 0, action.payload)
  }
}

const regexUpdateExisting = (state, action) => {

}

const regexMoveExisting = (state, action) => {

}

const regexValidate = (state, action) => {

}

const regexTest = (state, action) => {

}

export const regexesReducer = (state = {}, action) => {
  switch (action.type) {
    case REGEX.ADD_NEW_REGEX:
      return regexAddNew(state, action)

    case REGEX.UPDATE_EXISTING_REGEX:
      return regexUpdateExisting(state, action)

    case REGEX.MOVE_EXISTING_REGEX:
      return regexMoveExisting(state, action)

    case REGEX.VALIDATE_REGEX:
      return regexValidate(state, action)

    case REGEX.TEST_REGEX:
      return regexTest(state, action)

    default:
      return state
  }
}

export const regexIdReducer = (state = {}, action) => {
  if (action.type !== REGEX.INCREMENT_ID) {
    return state
  } else {
    return action.payload
  }
}
