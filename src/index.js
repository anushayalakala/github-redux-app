import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import { Provider } from 'react-redux';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './Store/Index';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
