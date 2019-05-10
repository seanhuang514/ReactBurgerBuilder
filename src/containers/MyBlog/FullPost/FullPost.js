import React, { Component } from 'react';
import axios from '../../../axios';
import classes from './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidMount() {
    this.loadPost();
  }

  componentDidUpdate() {
    this.loadPost();
  }

  loadPost() {
    const planId = this.props.match.params.id;

    if(!planId || (this.state.loadedPost && this.state.loadedPost.id == planId)) return

    axios.get('/posts/' + planId)
      .then(response => {
        this.setState({ loadedPost: response.data });
      })
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.state.id)
      .then(response => {
        this.setState({ loadedPost: null, id: null });
        console.log('deletePostHandler', response);
      })
  }

  render() {
    const planId = this.props.match.params.id
    if(!planId) return <p style={{ textAlign: 'center' }}>Please select a Post!</p>;;
    if(planId && !this.state.loadedPost) return <p style={{ textAlign: 'center' }}>Loading data ....</p>;
    
    
    const post = (
      <div className={classes.FullPost}>
        <h1>{this.state.loadedPost.title}</h1>
        <p>{this.state.loadedPost.body}</p>
        <div className={classes.Edit}>
          <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
        </div>
      </div>
    );
    return post;
  }
}

export default FullPost;
