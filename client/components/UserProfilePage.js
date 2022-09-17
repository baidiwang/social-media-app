//profile page of logged in user : must be able to edit user info && change avatar for profile photo
//show nav for users post / photos / followers?
//must be able to add / edit / delete post

import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserProfilePage = ({user, auth}) => {
    return (
        <div>
            {
                auth.id === user.id ?
                <p>User and auth is same person</p>
                :
                <p>not the same</p>
            }
        </div>
    )
};
const mapState = (state, { match })=> {
    const user = state.users.find(user => user.id === match.params.id*1) || {};
    return {
        user,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState)(UserProfilePage);