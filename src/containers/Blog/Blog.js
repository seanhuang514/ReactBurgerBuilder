import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Ajax/Post/Post";
import FullPost from "../../components/Ajax/FullPost/FullPost";
import NewPost from "../../components/Ajax/NewPost/NewPost";
import classes from "./Blog.css";

class Blog extends Component {
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response)
      })
  }
  render() {
    return (
      <div>
        <section className={classes.Posts}>
          <Post />
          <Post />
          <Post />
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
