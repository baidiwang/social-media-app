//all images uploaded by user should show up here descending order from the latest one to the lowest one?

import React from 'react';
import { connect } from 'react-redux';

const UserPhotosPage = ({ user, photos, auth}) => {
    return (
        // <div>
        //     {
        //         photos.map(photo => {
        //             return (
        //                 <img src={photo.photoUrl} width='200' height='200' />
        //             )
        //         })
        //     }
        // </div>
        <hr />
    )
};
const mapState = (state, { match }) => {
    const user = state.users.find(user => user.id === match.params.id*1) || {};
    const photos = state.photos.filter(photo => photo.userId === user.id) || [];
    return {
        user,
        photos,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(UserPhotosPage);