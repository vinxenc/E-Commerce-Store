#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from 'http';
import app from './src';
/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: string) => {
  const portValue = parseInt(val, 10);

  if (Number.isNaN(portValue)) {
    // named pipe
    return val;
  }

  if (portValue >= 0) {
    // port number
    return portValue;
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind =
    typeof port === 'string' ? `Pipe ${port}` : `Port ${port.toString()}`;

  // handle specific listen errors with friendly messages
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();

  const bind =
    typeof addr === 'string' || !addr ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
