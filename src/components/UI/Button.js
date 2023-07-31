import classes from './Button.module.css';

const Button = (props) => {
    const additionalClasses = []
    if (props.red) {
        additionalClasses.push(classes.background__red);
    }
    if (props.className) {
        additionalClasses.push(props.className);
    }

    return (
        <div onClick={props.onClick} className={[classes.options__button, ...additionalClasses].join(' ')}>
            {props.icon}
            {props.children}
        </div>
    )
};

export default Button;