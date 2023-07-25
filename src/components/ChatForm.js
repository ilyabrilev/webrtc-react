import { FaPaperPlane } from 'react-icons/fa6';
import classes from './ChatForm.module.css';
import Button from './Button';
import { useState } from 'react';
import { socket } from '../socket';

const ChatForm = () => {
    const [messageText, setMessageText] = useState('');

    const sendMessageHandler = (event) => {
        event.preventDefault();
        if (messageText.trim().length !== 0) {
          socket.emit('message:create', messageText);
          setMessageText('');
        }
    }

    const messageChangeHandler = (event) => {
        setMessageText(event.target.value);
    }

    return (
        <form onSubmit={sendMessageHandler} className={classes.main__message_container}>
            <input value={messageText} onChange={messageChangeHandler} type="text" autoComplete="off" placeholder="Введите сообщение..." />
            <Button onClick={sendMessageHandler} icon={<FaPaperPlane />} />
        </form>
    );
}

export default ChatForm;