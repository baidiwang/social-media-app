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
            bio: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.setState({id: this.props.auth.id, email: this.props.auth.email, avatar: this.props.auth.avatar, username: this.props.auth.username, bio: this.props.auth.bio})
    }
    handleChange(ev){
        this.setState({[ev.target.name]: ev.target.value});
    }
    onSubmit(ev) {
        ev.preventDefault();
        this.props.updateUsers(this.state);
    }
    render() {
        const { onSubmit } = this;
        const {avatar, username, bio} = this.state;
        return (
            
            <form>
                Username: <br></br>
                <input name="username" onChange={ this.handleChange } value={ username }/> <br></br>
                Bio: <br></br>
                <input name="bio" onChange={ this.handleChange } value={ bio } size="60"/> <br></br>
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