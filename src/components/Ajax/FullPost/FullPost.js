import React, { Component } from 'react';

import classes from './FullPost.css';

class FullPost extends Component {
    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.id === null) return post;

        post = (
            <div className={classes.FullPost}>
                <h1>Title</h1>
                <p>Content</p>
                <div className={classes.Edit}>
                    <button className="Delete">Delete</button>
                </div>
            </div>

        );
        return post;
    }
}

export default FullPost;