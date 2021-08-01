import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer } from './reducer'

const middleware = []
middleware.push(thunk)
middleware.push(createLogger())

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

console.log(store.getState())
