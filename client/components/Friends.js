import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Friends = ({ user }) => {
	const [friends, setFriends] = useState([])

	const history = useHistory();

	useEffect(() => {
		const token = window.localStorage.getItem('token')
		axios.get('/api/users', {
			headers: {
				authorization: token
			}
		}).then(res => {
			setFriends(res.data)
		})
	}, [])

	const sendMessage = (friendId) => {
		history.push('/message/' + friendId);
	}

	return (
		<div>
			<List>
				{
					friends.filter(friend => friend.id !== user.id).map(friend => (
						<ListItem disablePadding key={friend.id} secondaryAction={
							<IconButton edge="end" aria-label="delete" onClick={() => sendMessage(friend.id)}>
								<SendIcon />
							</IconButton>
						}>
							<ListItemButton>
								<ListItemIcon>
									<img src={friend.avatar} alt="avatar" />
								</ListItemIcon>
								<ListItemText primary={
									<Box ml={2}>
										<Typography variant="h6" gutterBottom>
											{friend.username}
										</Typography>
										<Box>{friend.email}</Box>
										<Box>{friend.bio}</Box>
									</Box>
								} />
							</ListItemButton>
						</ListItem>
					))
				}
			</List>
		</div>
	)
}

const mapState = (state) => {
	return {
		user: state.auth
	}
}
const mapDispatch = (dispatch) => {
	return {}
}
export default connect(mapState, mapDispatch)(Friends)
