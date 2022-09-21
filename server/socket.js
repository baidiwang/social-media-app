const app = require('./app')
const server = require('http').createServer(app);

const io = require('socket.io')(server);


io.on('connection', (socket) => {
	console.log('connect...')

	socket.on('createRoom', (data) => {
		socket.join(data.roomId);
	});

	socket.on('message', (data) => {
		socket.to(data.roomId).emit("message", data);
	});
});

module.exports = server;
