import React from 'react';

import * as store from './store'

import App from './App'
import { Provider } from 'react-redux'
import Section from '../../components/Section'

function MultipleStoresInOneApp() {
  return (
    <>
      <Section explanation="one store">
        <Provider store={store.create()}>
          <App />
        </Provider>
      </Section>
      <Section explanation="another store">
        <Provider store={store.create()}>
          <App />
        </Provider>
      </Section>
    </>
  )
}

export default MultipleStoresInOneApp;
