import { FaVideo, FaVideoSlash, FaUserPlus, FaRegComments, FaMicrophone, FaMicrophoneLinesSlash } from 'react-icons/fa6';

import Button from './Button';
import classes from './VideoSection.module.css';
import { useContext, useState } from 'react';
import UiContext from '../store/ui-context';

const VideoSection = () => {
    const uiCtx = useContext(UiContext);

    const [isVideoStopped, setIsVideoStopped] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const stopVideoHandler = () => {
        setIsVideoStopped(prevState => !prevState);
    }

    const muteHandler = () => {
        setIsMuted(prevState => !prevState);
    }

    const showChatHandler = () => {
        uiCtx.minChatToggle();
    }

    const inviteHandler = () => {

    }

    return (
        <section className={classes.main__left + ' ' + (uiCtx.minChatShown ? 'hide_on_small' : 'flex_on_small')}>
            <div className={classes.videos__group}>
                <div className={classes["video-grid"]}>

                </div>
            </div>
            <div className={classes.options}>
                <div className={classes.options__left}>
                    <Button onClick={stopVideoHandler} red={isVideoStopped} icon={isVideoStopped ? <FaVideoSlash /> : <FaVideo />} />
                    <Button onClick={muteHandler} red={isMuted} icon={isMuted ? <FaMicrophoneLinesSlash /> : <FaMicrophone />} />
                    <Button className={'hide_on_big ' + (uiCtx.minChatShown ? 'hide_on_small' : 'flex_on_small')}
                        onClick={showChatHandler}
                        icon={<FaRegComments />}
                    />
                </div>
                <div className={classes.options__right}>
                    <Button onClick={inviteHandler} icon={<FaUserPlus />} />
                </div>
            </div>
        </section>
    )
}

export default VideoSection;