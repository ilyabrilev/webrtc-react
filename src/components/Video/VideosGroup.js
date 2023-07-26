import { useContext, useEffect, useState } from 'react';
import classes from './VideosGroup.module.css';
import peer from '../../peer';
import { socket } from '../../socket';
import Video from './Video';
import UiContext from '../../store/ui-context';

const VideosGroup = (props) => {
    const [videos, setVideos] = useState([]);
    const currentUser = useContext(UiContext).currentUser;
    const [myVideoStream, setMyVideoStream] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (!myVideoStream) {
            return;
        }
        if (tasks.length > 0) {
            for (const task of tasks) {
                task.task(myVideoStream);
            }
            setTasks([]);
        }
    }, [myVideoStream, tasks])

    useEffect(() => {
        //if no current user, we'll wait untill he appears
        if (!currentUser.userId) {
            return;
        }

        //if we already have our streem, there is no point in registering events once again
        if (myVideoStream) {
            return;
        }
                    
        peer.on("call", (call) => {
            console.log(new Date().toISOString(), 'peer.on call happened');

            const task = (stream) => {            
                console.log('executing peer.on call task with userId ');

                call.answer(stream);
                call.on("stream", (userVideoStream) => {
                    console.log(new Date().toISOString(), 'New stream with id ' + call.peer);
                    addVideoStream(userVideoStream, call.peer);
                });
                call.on("error", (err) => {
                    console.log(new Date().toISOString(), 'new error');
                    console.log(err);
                });
            }
            
            if (!myVideoStream) {
                //queue task
                setTasks(prev => [...prev, {
                    task,
                    userId: call.peer,
                }]);
                return;
            }
            task(myVideoStream);
        });

        socket.on("room:user-connected", (userId, room) => {
            // console.log(room)
            console.log('new user connected with id ' + userId);

            const task = (stream) => {            
                console.log('executing user-connected task with userId ', userId);

                const call = peer.call(userId, stream);
                call.on("stream", (userVideoStream) => {
                    addVideoStream(userVideoStream, userId);
                });
                call.on("error", (err) => {
                    console.log(new Date().toISOString(), 'new error');
                    console.log(err);
                });
            }

            if (!myVideoStream) {
                //queue task
                setTasks(prev => [...prev, {
                    task,
                    userId,
                }]);
                return;
            }
            task(myVideoStream);
        });

        socket.on("room:connected-me", (userId, room) => {
            console.log('You have been connected with id ' + userId);
            // addVideoStream(myVideoStream, userId);
        });

        //user disconnected handler
        socket.on("room:user-disconnected", (userId, room) => {
            //deleting disconnected user's video if there are some
            setVideos(prevState => {
                return prevState.filter(item => item.userId !== userId);
            });
            //deleting disconnected user's task for adding video 
            //if he was disconnected during media device access check
            setTasks(prevTasks => prevTasks.filter(item => item.userId !== userId));
            console.log('user disconnected');
        });

        const addVideoStream = (stream, userId) => {
            setVideos((prevState => {
                const cleanState = prevState.filter(item => item.userId !== userId);
                return [...cleanState, {
                    userId,
                    stream
                }]
            }))
        };

        const setup = async () => {
            console.log('Calling setup...');
            
            //ToDo: check if this feature is supported by browser by checkin existence of navigator.mediaDevices
            const myVideoStreamConst = await navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video: true,
                });

            setMyVideoStream(myVideoStreamConst);
        }

        setup();
    }, [currentUser, myVideoStream]);

    return (
        <div className={classes.videos__group}>
            <div className={classes["video-grid"]}>
                {myVideoStream && <Video
                    userId={currentUser.userId}
                    stream={myVideoStream}
                    isMe={true}
                    isMuted={props.isSelfMuted}
                    isVideoStopped={props.isSelfVideoStopped}
                />}
                {videos.map((item => (
                    <Video key={item.userId} userId={item.userId} stream={item.stream} isMe={false} />
                )))}
            </div>
        </div>
    )
}

export default VideosGroup;
