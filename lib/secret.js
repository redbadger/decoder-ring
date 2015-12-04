/*
 * action types
 */

export const UPDATE_SECRET = 'UPDATE_SECRET'

/*
 * action creators
 */

export function Update (secret) {
  return {
    type: UPDATE_SECRET
  , secret
  }
}

export function update (state = '', action) {
  switch (action.type) {
    case UPDATE_SECRET:
      return action.secret
    default:
      return state
  }
}
