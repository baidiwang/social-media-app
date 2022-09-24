//be able to update user info

import React from 'react';
import { connect } from 'react-redux';
import { updateUsers } from '../store';

class UserUpdateForm extends React.Component {
    constructor(){
        super()
        this.state = {
            id: '',
            username: '',
            email: '',
            avatar: '',
            bio: '',
            isPrivate: 0
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
    }
    componentDidMount(){ 
        if(this.props.auth.isPrivate === false){
            this.setState({
                id: this.props.auth.id,
                email: this.props.auth.email,
                avatar: this.props.auth.avatar,
                username: this.props.auth.username,
                bio: this.props.auth.bio,
                isPrivate: 1
            })
        } else {
            this.setState({
                id: this.props.auth.id,
                email: this.props.auth.email,
                avatar: this.props.auth.avatar,
                username: this.props.auth.username,
                bio: this.props.auth.bio,
                isPrivate: 2
            })
        }
    }
    componentDidUpdate(prevProps){
        if(!prevProps.auth.id && this.props.auth.id){
            if(this.props.auth.isPrivate === false){
                this.setState({
                    id: this.props.auth.id,
                    email: this.props.auth.email,
                    avatar: this.props.auth.avatar,
                    username: this.props.auth.username,
                    bio: this.props.auth.bio,
                    isPrivate: 1
                })
            } else {
                this.setState({
                    id: this.props.auth.id,
                    email: this.props.auth.email,
                    avatar: this.props.auth.avatar,
                    username: this.props.auth.username,
                    bio: this.props.auth.bio,
                    isPrivate: 2
                })
            }
        }
        if(prevProps.auth.id && !this.props.auth.id){
            this.state = {
                id: '',
                username: '',
                email: '',
                avatar: '',
                bio: '',
                isPrivate: 0
            }
        }
    }
    handleChange(ev){
        this.setState({[ev.target.name]: ev.target.value});
    }
    onChangePhoto = (e) => {
        console.log(e.target.files)
        const photo = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({avatar: reader.result})
        });
        reader.readAsDataURL(photo);
    };
    onSubmit(ev) {
        ev.preventDefault();
        const { isPrivate } = this.state;
        if(isPrivate === '1'){
            this.props.updateUsers({...this.state, isPrivate: false});
        } else {
            this.props.updateUsers({...this.state, isPrivate: true});
        }
    }
    render() {
        const { onSubmit, handleChange, onChangePhoto } = this;
        const {avatar, username, bio, isPrivate} = this.state;
        return (
            
            <form>
                Username: <br></br>
                <input name="username" onChange={ handleChange } value={ username }/> <br></br>
                Bio: <br></br>
                <input name="bio" onChange={ handleChange } value={ bio } size="60"/> <br></br>
                <input type='file' onChange={ onChangePhoto } />
                <img src={avatar} width='160' height='160' />
                <select value={ isPrivate || 1} name='isPrivate' onChange={ handleChange }>
                        <option value={1}>set to public</option>
                        <option value={2}>set to private</option>
                    </select>
                <button onClick={onSubmit}>Submit changes</button>
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
        updateUsers: (user) =>  dispatch(updateUsers(user)),
    }
};
export default connect(mapState, mapDispatch)(UserUpdateForm);