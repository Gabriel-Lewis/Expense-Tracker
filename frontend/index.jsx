import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import routes from './routes';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';



document.addEventListener('DOMContentLoaded', () => {
    // const store = configureStore();
    const main = document.getElementById('main');
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>, main);
      window.store = store
});
