import { FaPaperPlane } from 'react-icons/fa6';
import classes from './ChatForm.module.css';
import Button from '../UI/Button';
import { useContext, useState } from 'react';
import UiContext from '../../store/ui-context';
// import { socket } from '../../socket';

const ChatForm = () => {
    const { socket } = useContext(UiContext);
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
        <form onSubmit={sendMessageHandler} className={classes["message-container"]}>
            <input value={messageText} onChange={messageChangeHandler} type="text" autoComplete="off" placeholder="Введите сообщение..." />
            <Button onClick={sendMessageHandler} icon={<FaPaperPlane />} />
        </form>
    );
}

export default ChatForm;