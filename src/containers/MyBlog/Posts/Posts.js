import React, { Component } from 'react';
import classes from './Posts.css'
import axios from "../../../axios";
import Post from "../../../components/MyBlog/Post/Post";
import FullPost from '../FullPost/FullPost'
import { Route } from 'react-router-dom';
class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return { ...post, author: 'sean' }
        })

        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    // this.setState({ selectedPostId: id });
    this.props.history.push({ pathname: '/posts/' + id });
  }

  get posts() {
    if(this.state.error) return <p style={{textAlign: 'center'}}>Something was wrong</p>
  
    return this.state.posts.map(post => {
      return (
        // <Link key={post.id} to={'/' + post.id}>
          <Post key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}/>
        // </Link>
      )
    });
  }

  render() {
    return (
      <div>
        <section className={classes.Posts}>
          {this.posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
      </div>
    );
  }
}

export default Posts