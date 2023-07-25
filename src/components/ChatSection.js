import { FaPaperPlane } from 'react-icons/fa6';
import classes from './ChatSection.module.css';
import Button from './Button';
import { useContext } from 'react';
import UiContext from '../store/ui-context';

const ChatSection = () => {
    const uiCtx = useContext(UiContext);

    const sendMessageHandler = () => {

    }

    return (
        <section className={classes.main__right + ' ' + (uiCtx.minChatShown ? 'flex_on_small' : 'hide_on_small')}>
            <div className={classes.main__chat_window}>
                <div className={classes.messages}>

                </div>
            </div>
            <form id="chat_form" className={classes.main__message_container}>
                <input id="chat_message" type="text" autoComplete="off" placeholder="Введите сообщение..." />

                <Button onClick={sendMessageHandler} icon={<FaPaperPlane />} />
            </form>
        </section>
    );
}

export default ChatSection;