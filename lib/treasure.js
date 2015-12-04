import base64 from 'urlsafe-base64'
import buffer from 'buffer'

/*
 * action types
 */

export const TREASURE_REQUEST = 'TREASURE_REQUEST'
export const TREASURE_FAILURE = 'TREASURE_FAILURE'
export const TREASURE_SUCCESS = 'TREASURE_SUCCESS'

const decoder = new TextDecoder()

function createKey (buffer) {
  buffer = buffer.slice(32, 64)
  return crypto.subtle.importKey('raw', buffer, 'AES-CBC', false, ['decrypt'])
}

function decompose (buffer) {
  return {
    iv: buffer.slice(0, 16)
  , message: buffer.slice(16)
  }
}

function decryptMessage (encrypted, key) {
  encrypted = base64.decode(encrypted).toArrayBuffer()
  encrypted = decompose(encrypted)
  return crypto.subtle.decrypt({ name: 'AES-CBC', iv: encrypted.iv }, key, encrypted.message)
}

/*
 * action creators
 */

function request (secret, key) {
  return {
    type: TREASURE_REQUEST
  , secret
  , key
  }
}

function failure (err) {
  return {
    type: TREASURE_FAILURE
  }
}

function success (message) {
  return {
    type: TREASURE_SUCCESS
  , message
  }
}

export function Update () {
  return (dispatch, getState) => {
    const state = getState()
    if (
      !state.treasure.isRequesting &&
      !!state.secret &&
      !!state.key.buffer &&
      (state.treasure.secret !== state.secret || state.treasure.key !== state.key.buffer)
    ) {
      dispatch(request(state.secret, state.key.buffer))
      createKey(state.key.buffer)
        .then(decryptMessage.bind(null, state.secret))
        .then(decoder.decode.bind(decoder))
        .then(message => dispatch(success(message)))
        .catch(err => dispatch(failure(err)))
    }
  }
}

export function update (state = {
  isRequesting: false
, didError: false
, secret: undefined
, key: undefined
, message: ''
}, action) {
  switch (action.type) {
    case TREASURE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true
      , secret: action.secret
      , key: action.key
      , message: ''
      })
    case TREASURE_FAILURE:
      return Object.assign({}, state, {
        didError: true
      , isRequesting: false
      , message: ''
      })
    case TREASURE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false
      , didError: false
      , message: action.message
      })
    default:
      return state
  }
}
