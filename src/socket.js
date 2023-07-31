import { io } from 'socket.io-client';

export {io};
// "undefined" means the URL will be computed from the `window.location` object
export const URL = 'https://localhost:3002';
export const Options = {autoConnect: false};