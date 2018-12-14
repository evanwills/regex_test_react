import { GENERAL } from '../actions/general.actions'


const split = (splitter, input) => {
  const regex = new RegExp('(.*?)(?=' + splitter + '|$)', 'g')
  return input.match(regex)
}

const trimRegex = new RegExp('^\s+|\s+$', 'g')

const trim = (input) => {
  return input.replace(trimRegex, '')
}


export const setInput = (store) => (next) => (action) => {
  if (action.type !== GENERAL.SET_INPUT) {
    next(action)
  } else {
    const config = store.getState()
    const input = (config.whiteSpace.split === true && config.whiteSpace.splitBefore === true) ? split(config.splitPattern, action.payload) : [action.payload]

    const newAction = {
      ...action,
      payload: (config.whiteSpace.trim === true && config.whiteSpace.trimBefore === true) ? input.map(_item => trim(_item)) : input
    }

    next(newAction)
  }
}

const implode = (sep) => (_accum, _item) => {
  if (_accum === '' ) {
    return _item
  } else {
    return _accum + sep + _item
  }
}

export const setOutput = (store) => (next) => (action) => {
  if (action.type !== GENERAL.SET_OUTPUT) {
    next(action)
  } else {
    const config = store.getState()
    const output = (config.whiteSpace.trim === true && config.whiteSpace.trimBefore === true) ? action.payload.map(_item => trim(_item)) : action.payload

    const newAction = {
      ...action,
      payload: (config.whiteSpace.split) ? output.reduce(implode(config.whiteSpace.joinString), '') : output[0]
    }

    next(newAction)
  }
}
