import React from 'react';
import Blog from './containers/MyBlog/Blog/Blog';
import { BrowserRouter } from 'react-router-dom';

function AjaxApp() {
  return (
    <BrowserRouter>
      <div>
        <Blog /> 
      </div>
    </BrowserRouter>
  );
}

export default AjaxApp;
