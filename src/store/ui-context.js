import React, { useState } from 'react';

const UiContext = React.createContext({
    minChatShown: false,
    minChatToggle: () => { },
    currentUser: {
        userName: '',
        userId: '',
    },
    storeCurrentUser: () => {},
});

export const UiContextProvider = (props) => {
    const [minChatShown, setMinChatShown] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const minChatToggle = () => {
        setMinChatShown(prevState => !prevState);
    }

    const storeCurrentUser = (userName, userId) => {
        setCurrentUser({userName, userId});
    }

    return (
        <UiContext.Provider
            value={{
                minChatShown,
                minChatToggle,
                currentUser,
                storeCurrentUser
            }}
        >
            {props.children}
        </UiContext.Provider>
    );
};

export default UiContext;
