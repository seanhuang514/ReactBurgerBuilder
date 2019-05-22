import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import AjaxApp from './AjaxApp';
// import ReduxApp from './ReduxApp';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas/index'

/* 預設URL */
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
/* 預設header */
// axios.defaults.headers.common['Authorization'] = 'Auth token';
/* 預設content-type */
// axios.defaults.headers.post['Content-type'] = 'application/json';
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: orderReducer,
  auth: authReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  
)

ReactDOM.render(app, document.getElementById('root'));
// ReactDOM.render(<AjaxApp />, document.getElementById('root'));
// ReactDOM.render(<ReduxApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
