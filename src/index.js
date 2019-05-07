import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AjaxApp from './AjaxApp';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

axios.interceptors.request.use(request => {
  console.log('request', request);
  return request;
}, error => {
  console.log('request-error', error);
});

axios.interceptors.response.use(response => {
  console.log('response', response);
}, error => {
  console.log('response-error', error)
});
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AjaxApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
