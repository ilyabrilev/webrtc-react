import { FaVideo, FaVideoSlash, FaUserPlus, FaRegComments, FaMicrophone, FaMicrophoneLinesSlash } from 'react-icons/fa6';

import Button from '../UI/Button';
import classes from './VideoSection.module.css';
import { useContext, useState } from 'react';
import UiContext from '../../store/ui-context';
import VideosGroup from './VideosGroup';
import CopyToClipboardModal from '../UI/CopyToClipboardModal';
import Modal from '../UI/Modal';

const VideoSection = () => {
    const uiCtx = useContext(UiContext);

    const [isVideoStopped, setIsVideoStopped] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [showInviteModal, setShowInviteModal] = useState(false);

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
        setShowInviteModal(true);
    }

    return (
        <section className={classes["main-left"] + ' ' + (uiCtx.minChatShown ? 'hide-on-small' : 'flex-on-small')}>
            <VideosGroup isSelfMuted={isMuted} isSelfVideoStopped={isVideoStopped} />
            <div className={classes.options}>
                <div className={classes["options-left"]}>
                    <Button onClick={stopVideoHandler} red={isVideoStopped} icon={isVideoStopped ? <FaVideoSlash /> : <FaVideo />} />
                    <Button onClick={muteHandler} red={isMuted} icon={isMuted ? <FaMicrophoneLinesSlash /> : <FaMicrophone />} />
                    <Button className={'hide-on-big ' + (uiCtx.minChatShown ? 'hide-on-small' : 'flex-on-small')}
                        onClick={showChatHandler}
                        icon={<FaRegComments />}
                    />
                </div>
                <div className={classes["options-right"]}>
                    <Button onClick={inviteHandler} icon={<FaUserPlus />} />
                </div>
            </div>
            {showInviteModal && <Modal onClose={() => setShowInviteModal(false)}>
                <CopyToClipboardModal onClose={() => setShowInviteModal(false)} />
            </Modal>}
        </section>
    )
}

export default VideoSection;