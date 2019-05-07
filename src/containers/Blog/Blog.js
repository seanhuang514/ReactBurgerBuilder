import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Ajax/Post/Post";
import FullPost from "../../components/Ajax/FullPost/FullPost";
import NewPost from "../../components/Ajax/NewPost/NewPost";
import classes from "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return { ...post, author: 'sean' }
        })

        this.setState({ posts: updatedPosts });
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  }

  render() {
    const posts = this.state.posts.map(post => {
      return <Post key={post.id}
                   title={post.title}
                   author={post.author}
                   clicked={() => this.postSelectedHandler(post.id)}/>
    });

    return (
      <div>
        <section className={classes.Posts}>
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
