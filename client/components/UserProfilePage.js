//profile page of logged in user : must be able to edit user info && change avatar for profile photo
//show nav for users post / photos / followers?
//must be able to add / edit / delete post

import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { addConnection, deleteConnection } from '../store';

const UserProfilePage = ({user, connection, auth, follow, unfollow}) => {
    console.log(connection)
    return (
        <div>
            <h1>{user.username}'s profile</h1>
            <img src={user.avatar} width='160' height='160'/>
            {
                auth.id === user.id ?
                null :
                <div>
                {
                    connection.id ?
                    <div>
                        {
                            connection.isAccepted === true ?
                            <button onClick={ () => unfollow(connection)}>Unfollow</button> :
                            <button disabled>Requested</button>
                        }
                    </div> :
                    <button onClick={ () => follow(auth, user)}>Follow</button>
                }
                </div>
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
    console.log(state.connections)
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