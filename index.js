import { createElement as h } from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import update from './lib/update'
import { Update as UpdateTreasure } from './lib/treasure'
import View from './lib/view'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(update)

const root = document.getElementById('mount')

function render () {
  ReactDOM.render(
    h(View, { dispatch: store.dispatch , state: store.getState() })
  , root
  )
}

function handleChange () {
  store.dispatch(UpdateTreasure())
  render()
}

store.subscribe(handleChange)
render()
