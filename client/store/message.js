import axios from 'axios';

const messages = (state= { messages: [], friend: null }, action) => {
	if(action.type === 'SET_MESSAGES'){
		return {
			...state,
			messages: action.messages
		};
	}
	else if(action.type === 'CREATE_MESSAGE'){
		return {
			...state,
			messages: [...state.messages, action.message]
		};
	} else if (action.type === 'SET_FRIEND') {
		return {
			...state,
			friend: action.friend
		}
	}
	return state;
};

//add message
export const addMessage = (text, senderId, receiverId) => {
	return async(dispatch) => {
		const message = (await axios.post('/api/messages', {
				text,
				senderId,
				receiverId,
				date: new Date()
			},
			{
				headers: {
					authorization: window.localStorage.getItem('token')
				}
			})).data;
		dispatch({type: 'CREATE_MESSAGE', message});
	}
};

//get messages
export const getMessages = (messageId) => {
	return async(dispatch) => {
		const messages = (await axios.get('/api/messages?messageId=' + messageId,
			{
				headers: {
					authorization: window.localStorage.getItem('token')
				}
			})).data;
		dispatch({type: 'SET_MESSAGES', messages});
	}
};

// get friend information
export const getFriend = (friendId) => {
	return async(dispatch) => {
		const friend = (await axios.get('/api/users/' + friendId,
			{
				headers: {
					authorization: window.localStorage.getItem('token')
				}
			})).data;
		dispatch({type: 'SET_FRIEND', friend});
	}
}

export default messages;
