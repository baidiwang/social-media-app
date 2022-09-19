//all images uploaded by user should show up here descending order from the latest one to the lowest one?

import React from 'react';
import { connect } from 'react-redux';

const UserPhotosPage = ({ user, photos, auth}) => {
    return (
        <div>
            Photos
            <ul>
            {
                photos.map(photo => {
                    return (
                        <li key={photo.id}><img src={photo.photoUrl} width='80' height='80' /></li>
                    )
                })
            }
            </ul>
        </div>
    )
};
const mapState = (state, { match }) => {
    const user = state.users.find(user => user.id === match.params.id) || {};
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