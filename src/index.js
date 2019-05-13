import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AjaxApp from './AjaxApp';
import ReduxApp from './ReduxApp';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

/* 預設URL */
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
/* 預設header */
// axios.defaults.headers.common['Authorization'] = 'Auth token';
/* 預設content-type */
// axios.defaults.headers.post['Content-type'] = 'application/json';

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// ReactDOM.render(app, document.getElementById('root'));
// ReactDOM.render(<AjaxApp />, document.getElementById('root'));
ReactDOM.render(<ReduxApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
