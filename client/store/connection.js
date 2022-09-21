import axios from 'axios';

const connections = (state = [], action) => {
    if(action.type === 'SET_CONNECTIONS'){
        return action.connections;
    }
    else if(action.type === 'ADD_CONNECTION'){
        return [action.connection, ...state];
    }
    else if(action.type === 'DELETE_CONNECTION'){
        return state.filter(connection => connection.id !== action.connection.id);
    }
    return state;
};

export const setConnections = () => {
    return async(dispatch) => {
        const connections = (await axios.get('/api/connections', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        dispatch({type: 'SET_CONNECTIONS', connections});
    }
};
export const addConnection = (following, follower) => {
    return async(dispatch) => {
        const connection = (await axios.post('/api/connections', {
            followingId: following.id,
            followerId: follower.id
        },
        {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        dispatch({type: 'ADD_CONNECTION', connection});
    }
}
export default connections;