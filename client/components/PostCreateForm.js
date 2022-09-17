//solely to create a post and add photosforpost component as helper compoent

import React from 'react';
import { connect } from 'react-redux';

class PostCreateForm extends React.Component {
    constructor(){
        super()
        this.state = {
            body: '',
            photos: []
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
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
    // handlePhotos = (photos) => {
    //     photos.map(photo => {
    //         this.props.addPhoto(photo, this.props.post.id)
    //     });
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        const { photos, body, this.props.auth } = this.state;
        this.props.createPostWithImages()
        // addPost(body, this.props.auth.id)
        // console.log(this.state.photos)
        // //get the id of the post just created in this form
        // //axios.post for post == if i await on this axios call, i will get the post that I just created
        // this.state.photos.map(photo => {
        //     this.props.addPhoto(photo, this.props.post.id)
        // });
        this.setState({photos: []});
    }
    render(){
        const { body } = this.state;
        const { onChange, handleSubmit } = this;
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
            </form>
        )
    }
}
const mapState = state => {
    return {

    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(PostCreateForm);