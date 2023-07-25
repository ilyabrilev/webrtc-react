import { Peer } from "peerjs";

const peer = new Peer(undefined, {
    path: "/peerjs",
    host: "localhost",
    port: 3001,
    secure: true,
});

export default peer;