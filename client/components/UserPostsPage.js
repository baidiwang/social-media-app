//all images uploaded by user should show up here descending order from the latest one to the lowest one?

import React from 'react';
import { connect } from 'react-redux';
import PostHelper from './PostHelper';

const UserPostsPage = ({ user, posts, auth, photos}) => {
    return (
      <PostHelper posts={posts} auth={auth} photos={photos} />
    )
};
const mapState = (state, { match }) => {
    const user = state.users.find(user => user.id === match.params.id) || {};
    const posts = state.posts.filter(post => post.userId === user.id) || [];
    return {
        user,
        posts,
        photos: state.photos,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(UserPostsPage);