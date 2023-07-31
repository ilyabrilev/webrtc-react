import { FaRegCircleUser } from 'react-icons/fa6';

import classes from './Message.module.css';

const Message = (props) => {
    return <div className={classes.message}>
        <div className={classes["message-header"]}>
            <FaRegCircleUser /> 
            <span> {props.isMine ? 'Me: ' : ''}{props.userName}</span>
        </div>
        <span className={classes["message-text"]}>{props.text}</span>
    </div>;
}

export default Message;