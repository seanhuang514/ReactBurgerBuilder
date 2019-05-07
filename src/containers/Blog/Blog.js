import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Ajax/Post/Post";
import FullPost from "../../components/Ajax/FullPost/FullPost";
import NewPost from "../../components/Ajax/NewPost/NewPost";
import classes from "./Blog.css";

class Blog extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response);
        this.setState({ posts: response.data });
      });
  }
  render() {
    const posts = this.state.posts.map(post => {
      return <Post key={post.id} title={post.title}/>
    });

    return (
      <div>
        <section className={classes.Posts}>
          {posts}
        </section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
