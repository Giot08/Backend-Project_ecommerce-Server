import dotenv from 'dotenv';
import Server from './models/server.models';

// Config dotenv
dotenv.config();

// Run server
const server = new Server();
server.listen();