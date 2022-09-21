import axios from 'axios';

const messages = (state=[], action) => {
	if(action.type === 'SET_MESSAGES'){
		return action.messages;
	}
	else if(action.type === 'CREATE_MESSAGE'){
		return [action.message, ...state];
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

export default messages;
