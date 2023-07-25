import React, { useState } from 'react';

const UiContext = React.createContext({
    minChatShown: false,
    minChatToggle: () => { },
});

export const UiContextProvider = (props) => {
    const [minChatShown, setMinChatShown] = useState(false);

    const minChatToggle = () => {
        setMinChatShown(prevState => !prevState);
    }

    return (
        <UiContext.Provider
            value={{
                minChatShown,
                minChatToggle
            }}
        >
            {props.children}
        </UiContext.Provider>
    );
};

export default UiContext;
