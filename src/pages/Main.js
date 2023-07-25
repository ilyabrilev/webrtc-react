import { useEffect } from "react";
import ChatSection from "../components/ChatSection";
import VideoSection from "../components/VideoSection";
import { socket } from '../socket';
import peer from "../peer";
import { useParams } from "react-router-dom";

const Main = () => {
  const roomId = useParams().roomId;

  useEffect(() => {
    const onConnectHandler = () => {
      console.log('Connected!');

      //ToDo: switch for prompt later
      const username = Math.floor(Math.random() * 100)
      peer.on("open", (id) => {
        console.log('peer on open:', id, ' ', username)
        socket.emit("room:join", roomId, id, username);
      });
    };

    socket.on('connect', onConnectHandler);

    return () => {
      socket.off('connect', onConnectHandler);
    };
  }, [roomId]);

  return (
    <>
      <VideoSection />
      <ChatSection />
    </>
  );
};

export default Main;