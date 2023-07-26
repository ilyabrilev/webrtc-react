import classes from './ChatSection.module.css';
import { useContext, useEffect, useState } from 'react';
import UiContext from '../../store/ui-context';
import ChatForm from './ChatForm';
import { socket } from '../../socket';
import Message from './Message';

const ChatSection = () => {
    const uiCtx = useContext(UiContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newMessageHandler = (message, userName, userId) => {
            console.log('Got message ' + message + ' from ' + userName);
            //ToDo: better ids
            setMessages(prevState => [...prevState, {userId, message, userName, id: new Date().getTime()}])
        }
        socket.on("message:new", newMessageHandler);

        return () => {
            socket.off('message:new', newMessageHandler);
          }; 
    }, []);

    return (
        <section className={classes.main__right + ' ' + (uiCtx.minChatShown ? 'flex_on_small' : 'hide_on_small')}>
            <div className={classes.main__chat_window}>
                <div className={classes.messages}>
                    {messages.map(item => (
                        <Message 
                            key={item.id} 
                            text={item.message} 
                            userName={item.userName}
                            isMine={item.userId === uiCtx.currentUser.userId}
                        />)
                    )}
                </div>
            </div>
            <ChatForm />
        </section>
    );
}

export default ChatSection;