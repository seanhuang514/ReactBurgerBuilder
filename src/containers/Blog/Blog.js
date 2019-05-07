import React, { Component } from 'react';

import Post from '../../components/Ajax/Post/Post';
import FullPost from '../../components/Ajax/FullPost/FullPost';
import NewPost from '../../components/Ajax/NewPost/NewPost';
import classes from './Blog.css';

class Blog extends Component {
    render () {
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