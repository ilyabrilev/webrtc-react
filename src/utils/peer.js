import { Peer } from "peerjs";

export { Peer };
export const Connection = undefined;
export const Options = {
  path: "/peerjs",
  host: process.env.REACT_APP_PEER_HOST,
  port: process.env.REACT_APP_PEER_PORT,
  secure: true,
}