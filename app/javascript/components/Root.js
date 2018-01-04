import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from '../ducks'
import PlacesList from './PlacesList'
import '../styles/main.css'
import 'semantic-ui-css/semantic.min.css';

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

export default () => <Provider store={store}>
    <PlacesList />
  </Provider>;
