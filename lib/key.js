/*
 * action types
 */

export const KEY_REQUEST = 'KEY_REQUEST'
export const KEY_FAILURE = 'KEY_FAILURE'
export const KEY_SUCCESS = 'KEY_SUCCESS'

function readFile (blob) {
  let promise = new Promise(function (resolve, reject) {
    let reader = new FileReader()
    reader.onload = function (event) {
      resolve(event.target.result)
    }
    reader.onerror = function () {
      reject(this)
    }
    reader.readAsArrayBuffer(blob)
  })
  return promise
}

/*
 * action creators
 */

function keyRequest (blob) {
  return {
    type: KEY_REQUEST
  , blob
  }
}

function keyFailure () {
  return {
    type: KEY_FAILURE
  }
}

function keySuccess (buffer) {
  return {
    type: KEY_SUCCESS
  , buffer
  }
}

export function Update (blob) {
  return dispatch => {
    dispatch(keyRequest(blob))
    return readFile(blob)
      .then(buffer => dispatch(keySuccess(buffer)))
      .catch(err => dispatch(keyFailure()))
  }
}

export function update (state = {
  isRequesting: false
, didError: false
, buffer: null
}, action) {
  switch (action.type) {
    case KEY_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true
      , buffer: null
      })
    case KEY_FAILURE:
      return Object.assign({}, state, {
        didError: true
      })
    case KEY_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false
      , didError: false
      , buffer: action.buffer
      })
    default:
      return state
  }
}
