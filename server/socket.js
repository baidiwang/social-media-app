const app = require('./app')
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log('connect...')

	socket.on('message', (data) => {
		socket.broadcast.emit("message", data);
	});
});

module.exports = server;
