import dotenv from 'dotenv';
import Server from './models/server.model';


// Config dotenv
dotenv.config();

// Run server
const server = new Server();
server.listen();