import React, { Component } from "react";
import classes from "./Blog.css";
import Posts from '../Posts/Posts'
import NewPost from '../NewPost/NewPost';
import { Route, Link } from 'react-router-dom';

class Blog extends Component {
  render() {
    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              {/* <li><a href="/">Home</a></li>
              <li><a href="/new-post">New Post</a></li> */}
              <li><Link to="/">Home</Link></li>
              <li><Link to={{ pathname: '/new-post', hash: 'submit', search: 'q=1' }}>New Post</Link></li>
            </ul>
          </nav>
        </header>
        
        {/* 
          Route 以 `/` 來匹配URL ，由URL 用 `\` 切開由長到短往下匹配
          有 match 的就會render，以下面的範例來說如果 URL 是 /post 的話
          只會 render `Home1`，如果 URL 是 /post/qqq 就會 render 
          Home1 & Home2

          <Route path="/post" render={() => <h1>Home1</h1>}/>
          <Route path="/post/qqq" render={() => <h1>Home2</h1>}/>

          但如果給 route 加上 exact 就會是完全匹配才會 render 所以到了
          /post/qqq 也不會 render Home1
          <Route path="/post" exact render={() => <h1>Home1</h1>}/>
        */}

        {/* <Route path="/post" exact render={() => <h1>Home1</h1>}/>
        <Route path="/post/qqq" render={() => <h1>Home2</h1>}/> */}

        <Route path="/" exact component={Posts}/>
        <Route path="/new-post" exact component={NewPost}/>
      </div>
    );
  }
}

export default Blog;
