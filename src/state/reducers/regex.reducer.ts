import { REGEX, UPDATE_REGEX } from '../actions/regex.action.js'

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
  switch (action.meta.mode) {
    case UPDATE_REGEX.UPDATE_REGEX_BASIC:
      return state.map(regex => {
        if (action.meta.id === regex.id) {
          return { ...regex, ...action.payload }
        } else {
          return regex
        }
      })

    case UPDATE_REGEX.UPDATE_REGEX_SET_ERROR:
      const errorObj = (action.payload.valid) ? {} : { message: action.payload.message, parts: action.payload.errorParts }
      return state.map(regex => {
        if (action.meta.id === regex.id) {
          return { ...regex, valid: action.payload.valid, error: errorObj, MATCHEs: [] }
        } else {
          return regex
        }
      })

    case UPDATE_REGEX.UPDATE_REGEX_SET_MATCHES:
      return state.map(regex => {
        if (action.meta.id === regex.id) {
          return { ...regex, valid: true, error: {}, matches: action.payload }
        } else {
          return regex
        }
      })
  }
}

const regexMoveExisting = (state, action) => {
  let i = null
  const regexToMove = state.reduce((_accum, _item, index) => {
    if (_item.id === action.payload.id) {
      _accum = _item
      i = index
    }
  }, false)

  if (regexToMove === false) {
    return state
  }

  const intermediateState = state.splice(i, 1)

  return intermediateState.splice(action.payload.position, 0, regexToMove)
}

export const regexesReducer = (state = {}, action) => {
  switch (action.type) {
    case REGEX.ADD_NEW_REGEX:
      return regexAddNew(state, action)

    case REGEX.UPDATE_EXISTING_REGEX:
      return regexUpdateExisting(state, action)

    case REGEX.MOVE_EXISTING_REGEX:
      return regexMoveExisting(state, action)

    case REGEX.DELETE_REGEX:
      return state.filter(_item => action.payload)

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
