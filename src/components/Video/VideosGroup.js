import { useContext, useEffect, useState } from 'react';
import classes from './VideosGroup.module.css';
import Video from './Video';
import UiContext from '../../store/ui-context';
import { isObjectEmpty } from '../../utils';

const VideosGroup = (props) => {
    const [videos, setVideos] = useState([]);
    const { currentUser, socket, peer } = useContext(UiContext);
    const [myVideoStream, setMyVideoStream] = useState(null);
    const [tasks, setTasks] = useState([]);

    //run tasks consisting of functions of adding new users or answering calls from existing users in the room
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
        
        //run only if socket and peer are available
        if (isObjectEmpty(socket) || isObjectEmpty(peer)) {
            return;
        }

        //if no current user, we'll wait untill he appears
        if (!currentUser.userId || !currentUser.userName) {
            return;
        }

        //if we already have our streem, there is no point in registering events once again
        if (myVideoStream) {
            return;
        }

        //registering "on call" peer handler. 
        //It executes when other members of the room calls you because you have joined the room
        //(they get room:user-connected event)
        peer.on("call", (call) => {
            console.log(new Date().toISOString(), 'peer.on call happened');

            const task = (myStream) => {
                console.log('executing peer.on call task with userId ');

                //when they call you, you aswer them with your video-audio stream
                call.answer(myStream);
                //and wait their stream to add as one of your video component
                call.on("stream", (incommingVideoStream) => {
                    console.log(new Date().toISOString(), 'New stream with id ' + call.peer);
                    const userName = call.metadata?.userName;
                    addVideoStream(incommingVideoStream, call.peer, userName);
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

        //registering room:user-connected socket event handler
        //it broadcasts to every member of the room with the exeption of the sender
        //by backend when another user triggers "room:join" socket event
        socket.on("room:user-connected", (userId, userName, room) => {
            console.log('new user connected with id ' + userId + ' and name ' + userName);

            const task = (myStream) => {
                console.log('executing user-connected task with userId ', userId);

                //this user calls connected user passing his stream and username
                const call = peer.call(userId, myStream, {metadata: {userName: currentUser.userName}});
                //and listens when other party answers with a stream
                call.on("stream", (incommingVideoStream) => {
                    addVideoStream(incommingVideoStream, userId, userName);
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
            console.log('user ' + userId + ' disconnected');
        });

        const addVideoStream = (stream, userId, userName) => {
            setVideos((prevState => {
                const cleanState = prevState.filter(item => item.userId !== userId);
                return [...cleanState, {
                    userId,
                    stream,
                    userName
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
    }, [currentUser, myVideoStream, socket, peer]);

    return (
        <div className={classes.videos__group}>
            <div className={classes["video-grid"]}>
                {myVideoStream && <Video
                    userId={currentUser.userId}
                    userName={currentUser.userName}
                    stream={myVideoStream}
                    isMe={true}
                    isMuted={props.isSelfMuted}
                    isVideoStopped={props.isSelfVideoStopped}
                />}
                {videos.map((item => (
                    <Video key={item.userId} userId={item.userId} userName={item.userName} stream={item.stream} isMe={false} />
                )))}
            </div>
        </div>
    )
}

export default VideosGroup;
