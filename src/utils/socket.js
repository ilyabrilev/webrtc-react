import { io } from 'socket.io-client';

export {io};
// "undefined" means the URL will be computed from the `window.location` object
export const URL = process.env.REACT_APP_SOCKET_URL;
export const Options = {autoConnect: false};