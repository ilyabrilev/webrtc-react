import { useEffect, useRef } from "react";
import classes from './VideosGroup.module.css';

const Video = (props) => {
    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.srcObject = props.stream;
    }, [props.stream]);

    useEffect(() => {
        videoRef.current.srcObject.getAudioTracks()[0].enabled = !props.isMuted;
    }, [props.isMuted]);

    useEffect(() => {
        videoRef.current.srcObject.getVideoTracks()[0].enabled = !props.isVideoStopped;
    }, [props.isVideoStopped]);

    return <div>
        <span className={classes['video-header']}>{props.userName ?? props.userId}{props.isMe ? ' (Me)' : ''}</span>
        <video style={{  }}
            className={classes.video}
            ref={videoRef}
            autoPlay
            muted={props.isMe}
        >
        </video>
    </div>

}

export default Video;