import { FaRegCircleUser } from 'react-icons/fa6';

import classes from './Message.module.css';

const Message = (props) => {
    return <div className={classes.message}>
        <div className={classes.message_header}>
            <FaRegCircleUser /> 
            <span> {props.userName}</span>
        </div>
        <span className={classes.message_text}>{props.text}</span>
    </div>;
}

export default Message;