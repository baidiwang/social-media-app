//all images uploaded by user should show up here descending order from the latest one to the lowest one?

import React from 'react';
import { connect } from 'react-redux';
import PostHelper from './PostHelper';

const UserPostsPage = ({ user, posts, auth, photos, connection}) => {
    return (
        <div>
            <h2>POSTS</h2>
            {
                auth.id === user.id?
                <div>
                    {
                        posts.length? <PostHelper posts={posts} auth={auth} photos={photos} /> : <p>No Posts Yet.</p>
                    }
                </div> :
                <div>
                {
                    connection.id ?
                    <div>
                    {
                        connection.isAccepted ?
                        <PostHelper posts={posts} auth={auth} photos={photos} /> :
                        <div>
                            <p>waiting on user approval</p>
                        </div>
                    }
                    </div> :
                    <div>
                        <p>User is private.</p>
                    </div>
                }
                </div>
            }
        </div>
    )
};
const mapState = (state, { match }) => {
    const user = state.users.find(user => user.id === match.params.id) || {};
    const posts = state.posts.filter(post => post.userId === user.id) || [];
    const connection = state.connections.find(connection => connection.followerId === user.id && connection.followingId === state.auth.id) || {};
    return {
        user,
        posts,
        photos: state.photos,
        auth: state.auth,
        connection
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(UserPostsPage);