import { FaCopy } from 'react-icons/fa6';

import Button from './Button';
import classes from './Modal.module.css';
import { useState } from 'react';

const CopyToClipboardModal = (props) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyHandler = () => {
        const onClick = async () => {
            if ("clipboard" in navigator) {
                await navigator.clipboard.writeText(window.location.href);
            } else {
                document.execCommand("copy", true, window.location.href);
            }
            setIsCopied(true);
        }
        onClick();
    }

    return <>
        <div className={classes.row}>
            <h1>Invite user to the room</h1>
        </div>
        <div className={classes.row}>
            {isCopied && <h3>Copied</h3>}
            {!isCopied && <h3>Copy url below</h3>}
        </div>
        <div className={classes["row-flex"]}>
            <input value={window.location.href} className={classes['modal-input-big']} type="text" autoComplete="off" readOnly />
            <Button icon={<FaCopy />} onClick={copyHandler}></Button>
        </div>
        <div className={classes['buttons-container'] + ' ' + classes.row}>
            <button className={classes['modal-button']} onClick={props.onClose}>Close</button>
        </div>
    </>

}

export default CopyToClipboardModal;