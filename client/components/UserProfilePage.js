//profile page of logged in user : must be able to edit user info && change avatar for profile photo
//show nav for users post / photos / followers?
//must be able to add / edit / delete post

import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserProfilePage = ({users}) => {



        const {id} = useParams();
        console.log(users);
        
        const user_list = users || [];
        const user = user_list.find(( u => u.id === id*1))

        return (
            <h1>{user.username}</h1>
    
        )





};
const mapState = state => {
    console.log(state);

    return {
        users: state.users 
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(UserProfilePage);