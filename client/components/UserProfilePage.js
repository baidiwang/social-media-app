//profile page of logged in user : must be able to edit user info && change avatar for profile photo
//show nav for users post / photos / followers?
//must be able to add / edit / delete post

import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { addConnection, deleteConnection, updateConnection } from '../store';

const UserProfilePage = ({user, connection, auth, followRequests, listOfFollowings, listOfFollowers, follow, unfollow, acceptRequest}) => {
    return (
        <div>
            <h1>{user.username}'s profile</h1>
            <img src={user.avatar} width='160' height='160'/>
            <p>{followRequests.length} Follow Requests</p>
            {/* modal when the <p> above has been clicked will show the list of follow requests need to be accepted down below -- line 18 - line 47 */}
            {
                auth.id === user.id ?
                <ul>
                    {
                        followRequests.map(request => {
                            return (
                                <li key={request.id}>
                                    <img src={request.following.avatar} width='20' height='20' />
                                    <Link to={`/profile/${request.following.id}`}>{request.following.username}</Link>
                                    <button onClick={ () => acceptRequest(request, auth, user)}>Accept</button>
                                    <button onClick={ () => unfollow(connection)}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ul> :
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
            <h2>Followers</h2>
            <p>{listOfFollowers.length}</p>
            <ul>
                {
                    listOfFollowers.map(connection => {
                        return (
                            <li key={connection.id}>
                                <img src={connection.following.avatar} width='40' height='40' />
                                <Link to={`/profile/${connection.following.id}`}>{connection.following.username}</Link>
                                <button onClick={ () => unfollow(connection)}>Remove</button>
                            </li>
                        )
                    })
                }
            </ul>
            <h2>Following</h2>
            <p>{listOfFollowings.length}</p>
            <ul>
                {
                    listOfFollowings.map(connection => {
                        return (
                            <li key={connection.id}>
                                <img src={connection.follower.avatar} width='40' height='40' />
                                <Link to={`/profile/${connection.follower.id}`}>{connection.follower.username}</Link>
                                <button onClick={ () => unfollow(connection)}>Unfollow</button>
                            </li>
                        )
                    })
                }
            </ul>
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
    //connection -- check if there is a request of the auth to the profile owner
    const connection = state.connections.find(connection => connection.followerId === user.id && connection.followingId === state.auth.id) || {};
    //get all follow requests to the profile owner
    const followRequests = state.connections.filter(connection => connection.followerId === user.id && connection.isAccepted === false) || [];
    //get all list of followers that are accepted
    const listOfFollowers = state.connections.filter(connection => connection.followerId === user.id && connection.isAccepted === true) || [];
    //get all list of people we are following that are accepted
    const listOfFollowings = state.connections.filter(connection => connection.followingId === user.id && connection.isAccepted === true) || [];
    return {
        user,
        connection,
        auth: state.auth,
        followRequests,
        listOfFollowers,
        listOfFollowings
    };

};
const mapDispatch = dispatch => {
    return {
        follow: (auth, user) => {
            dispatch(addConnection(auth,user))
        },
        unfollow: (connection) => {
            dispatch(deleteConnection(connection))
        },
        acceptRequest: (connection, auth, user) => {
            dispatch(updateConnection(connection, auth, user))
        }
    }
}
export default connect(mapState, mapDispatch)(UserProfilePage);