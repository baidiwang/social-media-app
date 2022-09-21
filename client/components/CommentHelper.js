import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../store';

const CommentHelper = ({ authId, postId, addComment}) => {
    const [body, setBody] = useState('');
    const onChange = e => {
        setBody(e.target.value)
    };
    const handleSubmit = e => {
        e.preventDefault();
        addComment(body, postId, authId);
        setBody('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder='Write a comment...'
                type='text'
                value={ body }
                onChange={ onChange }
                required
            />
            <button type='submit'>Send</button>
        </form>
    )
};
const mapDispatch = dispatch => {
    return {
        addComment: (comment, postId, authId) => {
            dispatch(addComment(comment, postId, authId))
        }
    }
}
export default connect(null, mapDispatch)(CommentHelper);