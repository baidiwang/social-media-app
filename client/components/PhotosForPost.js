//should be able to upload images using this component
//should be able to use it as a helper component for post / update post

import React from 'react';
import { connect } from 'react-redux';
import { addPhoto } from '../store';

class PhotosForPost extends React.Component {
    constructor(){
        super()
        this.state = {
            photos: []
        }
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangePhoto = (e) => {
        console.log(e.target.files)
        const photo = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({photos: [...this.state.photos, reader.result]})
        });
        reader.readAsDataURL(photo);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.photos)
        this.state.photos.map(photo => {
            this.props.addPhoto(photo, this.props.post.id)
        });
        this.setState({photos: []});
    };
    render(){
        const { onChangePhoto, handleSubmit } = this;
        const { photos } = this.state;
        return (
            <form onSubmit={ handleSubmit }>
                <label>Photo:<br />
                    <input
                        type='file'
                        multiple
                        onChange={ onChangePhoto }
                    />
                </label>
                <ul className='form-photos-display'>
                {
                    photos.map(photo => {
                        return (
                            <li key={photo}><img src={photo? photo : null} width='120' height='120'/></li>
                        )
                    })
                }
                </ul>
                <button type='submit'>Add Photos</button>
                <button onClick={() => this.setState({photos: []})}>Reset</button>
            </form>
        )
    }
};
const mapState = (state, { match }) => {
    const post = state.posts.find(post => post.id === match?.params.id*1) || {};
    return {
        post,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {
        addPhoto: (image, postId) => {
            dispatch(addPhoto(image, postlId))
        }
    }
};
export default connect(mapState, mapDispatch)(PhotosForPost);