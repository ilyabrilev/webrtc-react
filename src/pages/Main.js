import { useContext, useEffect } from "react";
import ChatSection from "../components/Chat/ChatSection";
import VideoSection from "../components/Video/VideoSection";
import { socket } from '../socket';
import peer from "../peer";
import { useParams } from "react-router-dom";
import UiContext from "../store/ui-context";

const Main = () => {
  const roomId = useParams().roomId;
  const storeCurrentUser = useContext(UiContext).storeCurrentUser;

  useEffect(() => {
    const onConnectHandler = () => {
      console.log('Socket connected!');

      //ToDo: switch for prompt later
      const username = Math.floor(Math.random() * 100)
      peer.on("open", (id) => {
        console.log('peer on open:', id, ' ', username)
        socket.emit("room:join", roomId, id, username);
        storeCurrentUser(username, id);
      });
    };

    socket.on('connect', onConnectHandler);

    return () => {
      socket.off('connect', onConnectHandler);
    };
  }, [roomId, storeCurrentUser]);

  return (
    <>
      <VideoSection />
      <ChatSection />
    </>
  );
};

export default Main;