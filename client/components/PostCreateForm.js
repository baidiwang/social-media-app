//solely to create a post and add photosforpost component as helper compoent

import React from 'react';
import { connect } from 'react-redux';
import { addPhoto, createPost } from '../store';

class PostCreateForm extends React.Component {
    constructor(){
        super()
        this.state = {
            body: '',
            photos: []
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
    };
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    onChangePhoto = (e) => {
        console.log(e.target.files)
        const photo = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({photos: [...this.state.photos, reader.result]})
        });
        reader.readAsDataURL(photo);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { photos, body } = this.state;
        this.props.createPostWithImages(photos, body, this.props.auth)
        this.setState({photos: [], body: ''});
    };
    render(){
        const { body, photos } = this.state;
        const { onChange, onChangePhoto, handleSubmit } = this;
        return (
            <form onSubmit={ handleSubmit }>
                <button type='submit'>Add Post</button>
                <input
                    placeholder='Write caption...'
                    type='text'
                    name='body'
                    value={ body}
                    onChange={ onChange }
                    required
                />
                <input
                    type='file'
                    multiple
                    onChange={ onChangePhoto }
                />
                <ul className='form-photos-display'>
                {
                    photos.map(photo => {
                        return (
                            <li key={photo}><img src={photo? photo : null} width='120' height='120'/></li>
                        )
                    })
                }
                </ul>
            </form>
        )
    }
};
const mapState = state => {
    return {
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {
        createPostWithImages: async(photos, body, auth) => {
            const post = await dispatch(createPost(body, auth));
            console.log(post)
            photos.map(photo => {
                dispatch(addPhoto(photo, post, auth))
            })
        }
    };
};
export default connect(mapState, mapDispatch)(PostCreateForm);