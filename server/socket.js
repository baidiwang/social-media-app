const app = require('./app')
const {db} = require('./db')
const server = require('http').createServer(app);

const io = require('socket.io')(server);


io.on('connection', (socket) => {
	console.log('connect...')

	socket.on('createRoom', (data) => {
		socket.join(data.roomId);
	});

	socket.on('message', async (data) => {
		const message = await db.models.user.prototype.addMessage({
			text: data.text,
			senderId: data.senderId,
			receiverId: data.receiverId,
			date: new Date()
		});
		socket.to(data.roomId).emit("message", message);
		socket.broadcast.emit("messages", message);
	});

	socket.on('forceDisconnect', () => {
		socket.disconnect();
	});
});

module.exports = server;
