import React, { Component, PropTypes, createElement as h } from 'react'
import classnames from 'classnames'
import { Update as UpdateSecret } from './secret'
import { Update as UpdateKey } from './key'

function onFileChange (dispatch, event) {
  const blob = event.target.files[0]
  dispatch(UpdateKey(blob))
};

let View = function (props) {
  let message;
  if (props.state.treasure.message) {
    message = h('div'
    , null
    , h('span'
      , { className: 'App-treasureTweet'
        }
      , 'Quick tweet this:'
      )
    , h('span'
      , null
      , props.state.treasure.message
      )
    )
  } else {
    message = h('div'
    , { className: 'App-treasureQuestion'
      }
    , '?'
    )
  }
  return (
    h('div', { className: 'App' },
      h('textarea'
      , { className: classnames({
            'App-secret': true
          , 'is-filled': props.state.secret
          })
        , type: 'text'
        , placeholder: 'Secret'
        , value: props.state.secret
        }
      )
    , h('div'
      , { className: 'App-key'
        }
      , h('label'
        , { className: classnames({
              'App-keyLabel': true
            , 'is-filled': props.state.key.buffer
            })
          , htmlFor: 'App-keyInput'
          }
        , 'Key'
        )
      , h('input'
        , { id: 'App-keyInput'
          , className: 'App-keyInput'
          , type: 'file'
          , accept: 'image/png'
          , onChange: onFileChange.bind(null, props.dispatch)
          }
        )
      )
    , h('div'
      , { className: classnames({
            'App-treasure': true
          , 'is-correct': props.state.treasure.message
          })
        }
      , message
      )
    )
  )
}

View.propTypes = {
  dispatch: PropTypes.func.isRequired
, state: React.PropTypes.shape({
    secret: PropTypes.string.isRequired
  , key: React.PropTypes.shape({
      buffer: PropTypes.isRequired
    })
  , treasure: React.PropTypes.shape({
      message: PropTypes.string.isRequired
    })
  })
}

export default View
