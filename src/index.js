import http from 'http'
import { createServer } from 'http'

import app from './server'
let currentApp = app
let port = 3001;

// Only user http wrapper if you want hot module reloading or websockets
// Otherwise, app.listen is ok!
const server = http.createServer(app);
server.listen(port, () => {
	console.log(`Server is running on port: ${port}.`);
});

// app.listen(port, () => {
// 	console.log(`Server is running on port: ${port}.`);
// });

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
