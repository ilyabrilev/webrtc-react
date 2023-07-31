import React, { useRef } from 'react';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

import classes from './Modal.module.css';

const Modal = (props) => {
    const nameRef = useRef();

    const generateNameHandler = () => {
        const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
        props.onNameSave(randomName);
    }

    const enterNameHandler = () => {
        props.onNameSave(nameRef.current.value);
    }

    return (
        <>
            <div className={classes.backdrop} onClick={props.onClose}></div>
            <div className={classes.modal}>
                <div className={classes.row}>
                    <h1>Pick a name</h1>
                </div>
                <div className={classes.row}>
                    <input ref={nameRef} className={classes['modal-input']} type="text" autoComplete="off" placeholder="Enter name..." />
                </div>
                <div className={classes['buttons-container'] + ' ' + classes.row}>
                    <button className={classes['modal-button']} onClick={enterNameHandler}>Submit name</button>
                    <button className={classes['modal-button']} onClick={generateNameHandler}>Generate a name</button>
                    <button className={classes['modal-button']} onClick={props.onClose}>Dismiss</button>
                </div>
            </div>
        </>
    );
}

export default Modal;