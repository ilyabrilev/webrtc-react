import { useEffect, useRef } from "react";
import classes from './VideosGroup.module.css';


const Video = (props) => {
    const videoRef = useRef();

    const loadedmetadataHandler = (e) => {
        // console.log('loadedmetadataHandler happenned!');
        // console.log(e);
    }

    useEffect(() => {
        videoRef.current.srcObject = props.stream;
    }, [props.stream]);

    useEffect(() => {
        videoRef.current.srcObject.getAudioTracks()[0].enabled = !props.isMuted;
    }, [props.isMuted]);

    useEffect(() => {
        videoRef.current.srcObject.getVideoTracks()[0].enabled = !props.isVideoStopped;
    }, [props.isVideoStopped]);

    return <>
        <div>
            <span style={{ color: 'white' }}>{props.userName ?? props.userId}{props.isMe ? '(Me)': ''}</span>
            <video style={{ display: 'block' }}
                className={classes.video}
                ref={videoRef}
                onLoadedMetadata={loadedmetadataHandler}
                autoPlay
                muted={props.isMe}                
            >   
            </video>
        </div>
    </>
}

export default Video;