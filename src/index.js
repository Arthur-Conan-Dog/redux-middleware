import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MultipleStoresInOneApp from './sections/01-multiple-stores'

import * as serviceWorker from './serviceWorker';

function App() {
  return (
    <div className="app-container">
      <nav className="app-section-nav">
        <ul>
          <li>Multiple stores in one app.</li>
        </ul>
      </nav>
      <main className="app-section-container">
        <MultipleStoresInOneApp />
      </main>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
