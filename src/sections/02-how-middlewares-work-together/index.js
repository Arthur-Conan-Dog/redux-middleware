import React from 'react';

import Section from '../../components/Section'
import { AppUseNormalDispatch, AppUseDispatchInMapping } from './App'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import reducer from '../../utils/reducer'
import ReduxThunk from "redux-thunk";
import logger from '../../utils/logger'

const storeOfSquirrel = () => createStore(reducer, applyMiddleware(logger('🐿'), ReduxThunk));
const storeOfBeaver = () => createStore(reducer, applyMiddleware(ReduxThunk, logger('🦦')));

function HowMiddlewaresWorkTogether() {
  return (
    <>
      <Section explanation="normal dispatch, middlewares apply sequence: logger => thunk">
        <Provider store={storeOfSquirrel()}>
          <AppUseNormalDispatch />
        </Provider>
      </Section>
      <Section explanation="mapping dispatch, middlewares apply sequence: thunk => logger">
        <Provider store={storeOfSquirrel()}>
          <AppUseDispatchInMapping />
        </Provider>
      </Section>
      <Section explanation="normal dispatch, middlewares apply sequence: thunk => logger">
        <Provider store={storeOfBeaver()}>
          <AppUseNormalDispatch />
        </Provider>
      </Section>
      <Section explanation="mapping dispatch, middlewares apply sequence: thunk => logger">
        <Provider store={storeOfBeaver()}>
          <AppUseDispatchInMapping />
        </Provider>
      </Section>
    </>
  )
}

export default HowMiddlewaresWorkTogether;
