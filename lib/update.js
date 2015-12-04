import { combineReducers } from 'redux'
import { update as secret } from './secret'
import { update as key } from './key'
import { update as treasure } from './treasure'

const update = combineReducers({
  key
, secret
, treasure
})

export default update
