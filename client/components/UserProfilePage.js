//profile page of logged in user : must be able to edit user info && change avatar for profile photo
//show nav for users post / photos / followers?
//must be able to add / edit / delete post

import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { addConnection, deleteConnection } from '../store';

const UserProfilePage = ({user, connection, auth, follow, unfollow}) => {
    return (
        <div>
            <h1>{user.username}'s profile</h1>
            <img src={user.avatar} width='160' height='160'/>
            {
                connection.id ? <button onClick={ () => unfollow(connection)}>Unfollow</button> : <button onClick={ () => follow(auth, user)}>Follow</button>
            }
            <h2>About me:</h2>
            <p>{user.bio}</p>
            {
                auth.id === user.id ?
                <Link to={`/profile/${auth.id}/update`}> Edit my profile </Link> : ''
            }
        </div>
    )
};
const mapState = (state, { match })=> {
    const user = state.users.find(user => user.id === match.params.id) || {};
    const connection = state.connections.find(connection => connection.followerId === user.id && connection.followingId === state.auth.id) || {};
    return {
        user,
        connection,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {
        follow: (auth, user) => {
            dispatch(addConnection(auth,user))
        },
        unfollow: (connection) => {
            dispatch(deleteConnection(connection))
        }
    }
}
export default connect(mapState, mapDispatch)(UserProfilePage);
