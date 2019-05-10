import React, { Component } from 'react';
import axios from '../../../axios';
import classes from './NewPost.css';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    postData = () => {
      const payload = {
        title: this.state.title,
        body: this.state.content,
        author: this.state.author
      }
      axios.post('/posts', payload)
        .then(response => {
          // console.log(response);
          // this.setState({ submitted: true });
          this.props.history.push('/posts') //can go back to previous page
          // this.props.history.replace('/posts') //can not go back to previous page 
        })
    }

    get redirect() {
      if(this.state.submitted) {
        return <Redirect to="/posts" /> //can not go back to previous page 
      }else {
        return null
      }
    }

    render () {
        return (
            <div className={classes.NewPost}>
                {this.redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="sean">sean</option>
                </select>
                <button onClick={this.postData}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;