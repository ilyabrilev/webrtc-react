import { FaAngleLeft } from 'react-icons/fa6';

import classes from './Header.module.css';
import { useContext } from 'react';
import UiContext from '../../store/ui-context';

const Header = () => {
    const uiCtx = useContext(UiContext);
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <div 
                    onClick={uiCtx.minChatToggle}
                    className={classes.header__back + ' hide_on_big ' + (uiCtx.minChatShown ? 'block_on_small' : 'hide_on_small')}
                >
                    <FaAngleLeft />
                </div>
                <h3>Video Chat</h3>
            </div>
        </header>
    );
};

export default Header;