import React, { Component, Suspense } from "react";
import classes from "./Blog.css";
import Posts from '../Posts/Posts'
// import NewPost from '../NewPost/NewPost';
import AsyncComponent from '../../../hoc/AsyncComponent/AsyncComponent'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

const AsyncNewPost = AsyncComponent(() => {
  return import('../NewPost/NewPost')
})

const AsyncNewPost2 = React.lazy(() => import('../NewPost/NewPost'))
class Blog extends Component {
  state = {
    auth: true
  }

  get suspenseComponent() {
    return <Suspense fallback={<div>Loading....</div>}><AsyncNewPost2/></Suspense>
  }
  
  render() {
    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              {/* <li><a href="/">Home</a></li>
              <li><a href="/new-post">New Post</a></li> */}
              <li><NavLink exact to="/posts" activeClassName={classes.active}>Home</NavLink></li>
              <li>
                <NavLink 
                  to={{ pathname: '/new-post', hash: 'submit', search: 'q=1' }}
                  activeClassName={classes.active}
                  activeStyle={{ color: 'pink' }}>
                  New Post
                </NavLink>
              </li>
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

        <Switch>
          {/* {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> :null} */}
          
          {this.state.auth ? <Route path="/new-post" render={() => this.suspenseComponent}/> :null}
          
          <Route path="/posts" component={Posts}/>
          <Redirect exact from="/" to="/posts"/>
          <Route render={() => <h1>Not Found</h1>}/>  
        </Switch>
      </div>
    );
  }
}

export default Blog;
