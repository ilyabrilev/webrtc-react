import classes from './Modal.module.css';

const SuccessNameModal = (props) => {
    return <div className={classes.row}>
        <h1>Hi, {props.userName}</h1>
        <div className={classes['buttons-container'] + ' ' + classes.row}>
            <button className={classes['modal-button']} onClick={props.onClose}>Close</button>
        </div>
    </div>

}

export default SuccessNameModal;