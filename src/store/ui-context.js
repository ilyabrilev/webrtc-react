import React, { useCallback, useState } from 'react';
import { io, URL, Options as SocketOptions } from '../utils/socket';
import { Peer, Connection as PeerConnection, Options as PeerOptions } from '../utils/peer';

const UiContext = React.createContext({
    minChatShown: false,
    minChatToggle: () => { },
    currentUser: {
        userName: '',
        userId: '',
    },
    storeUserName: () => { },
    storeUserId: () => { },
    setupSocket: () => {},
    socket: {
        connect: () => { },
        on: () => { },
        off: () => { },
    },
    setupPeer: () => {},
    peer: {
        on: () => { },
        off: () => { },
    },
});

export const UiContextProvider = (props) => {
    const [minChatShown, setMinChatShown] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [socket, setSocket] = useState({});
    const [peer, setPeer] = useState({});

    const minChatToggle = () => {
        setMinChatShown(prevState => !prevState);
    }

    const storeUserName = (userName) => {
        setCurrentUser(prevState => ({ userId: prevState.userId, userName }));
    }

    const storeUserId = (userId) => {
        console.log('saving user id: ', userId);
        setCurrentUser(prevState => ({ userId, userName: prevState.userName }));
    }

    const setupSocket = useCallback(() => {
        // "undefined" means the URL will be computed from the `window.location` object
        const socket = io(URL, SocketOptions);
        setSocket(socket);
    }, []);

    const setupPeer = useCallback(() => {
        const peer = new Peer(PeerConnection, PeerOptions);
        setPeer(peer);
    }, []);

    return (
        <UiContext.Provider
            value={{
                minChatShown,
                minChatToggle,
                currentUser,
                storeUserName,
                storeUserId,
                socket,
                setupSocket,
                peer,
                setupPeer,
            }}
        >
            {props.children}
        </UiContext.Provider>
    );
};

export default UiContext;
