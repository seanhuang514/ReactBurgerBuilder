import React, { Component } from 'react';
import axios from 'axios';
import classes from './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidUpdate() {
    if(!this.props.id || (this.state.loadedPost && this.state.loadedPost.id === this.props.id)) return

    axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
      .then(response => {
        this.setState({ loadedPost: response.data });
      })

    // console.log('componentDidUpdate')
  }

  deletePostHandler = () => {
    axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
      .then(response => {
        this.setState({ loadedPost: null });
        console.log('deletePostHandler', response);
      })
  }

  render() {
    console.log('render-this.props.id', this.props.id)
    if(!this.props.id) return <p style={{ textAlign: 'center' }}>Please select a Post!</p>;;
    if(this.props.id && !this.state.loadedPost) return <p style={{ textAlign: 'center' }}>Loading data ....</p>;
    
    
    const post = (
      <div className={classes.FullPost}>
        <h1>{this.state.loadedPost.title}</h1>
        <p>{this.state.loadedPost.content}</p>
        <div className={classes.Edit}>
          <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
        </div>
      </div>
    );
    return post;
  }
}

export default FullPost;
