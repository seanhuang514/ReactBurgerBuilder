import './index.css'
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';


const app = (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)

ReactDom.render(app, document.getElementById('root'));
