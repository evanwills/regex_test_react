import { REGEX } from '../actions/regex.action.js'

export const newRegex = (store) => (next) => (action) => {
  if (action.type !== REGEX.ADD_NEW_REGEX) {
    next(action)
  } else {
    const currentState = store.getState()
    const newID = currentState.regexID + 1

    const incrementIDAction = {
      type: REGEX.INCREMENT_ID,
      payload: newID
    }
    store.dispatch(incrementIDAction)

    const triggerRegex = currentState.regexes.filter(regex => regex.id === action.meta.id).reduce((_accum, _item) => { return _item }, null)

    const newPayload = {
      id: currentState.regexID,
      pattern: '',
      replace: '',
      delimiter: (triggerRegex !== null) ? triggerRegex.delimiter : currentState.overRideDelimiter,
      modifiers: '',
      isMultiLine: (triggerRegex !== null) ? triggerRegex.isMultiLine : currentState.multiLineRegex,
      multiLineCount: (triggerRegex !== null) ? triggerRegex.multiLineCount : (currentState.multiLineRegex) ? currentState.defaultMultiLineCount : 0,
      transformEscapedWhiteSpace: true,
      valid: true,
      error: {},
      result: []
    }

    const updatedAction = { ...action, payload: newPayload }
    next(updatedAction)
  }
}
