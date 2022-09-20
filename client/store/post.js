import axios from 'axios';

const posts = (state=[], action) => {
    if(action.type === 'SET_POSTS'){
        return action.posts;
    }
    else if(action.type === 'CREATE_POST'){
        return [action.post, ...state];
    }
    return state;
};

export const setPosts = () => {
    return async(dispatch) => {
        const posts = (await axios.get('/api/posts', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        dispatch({type: 'SET_POSTS', posts})
    }
};

export const createPost = (body, auth) => {
    return async(dispatch) => {
        const post = (await axios.post('/api/posts', {
            body: body,
            userId: auth.id,
            date: new Date()
        },
        {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        console.log(post)
        dispatch({type: 'CREATE_POST', post});
        return post;
    }
};

export default posts;