import { useContext, useEffect, useState } from "react";
// import { socket } from '../socket';
// import peer from "../peer";
import { useParams } from "react-router-dom";

import ChatSection from "../components/Chat/ChatSection";
import VideoSection from "../components/Video/VideoSection";
import Modal from "../components/UI/Modal";

import UiContext from "../store/ui-context";
import { isObjectEmpty } from "../utils";

const Main = () => {
  const roomId = useParams().roomId;
  const { storeUserName, storeUserId, currentUser, socket, setupSocket, peer, setupPeer } = useContext(UiContext);
  const [showNameModal, setShowNameModal] = useState(true);

  //get socket
  useEffect(() => {
    if (!currentUser.userName) {
      return;
    }
    setupSocket();
  }, [currentUser.userName, setupSocket]);

  //setup socket
  useEffect(() => {
    if (!currentUser.userName || isObjectEmpty(socket)) {
      return;
    }

    const onConnectHandler = () => {
      console.log('Socket connected!');
      setupPeer();
    };

    socket.connect();
    socket.on('connect', onConnectHandler);

    return () => {
      socket.off('connect', onConnectHandler);
    };
  }, [currentUser.userName, socket, setupPeer]);

  //setup peer
  useEffect(() => {
    if (!currentUser.userName || isObjectEmpty(socket) || isObjectEmpty(peer)) {
      return;
    }
    peer.on("open", (id) => {
      console.log('peer on open:', id, ' ', currentUser.userName);
      socket.emit("room:join", roomId, id, currentUser.userName);
      storeUserId(id);
    });
  }, [peer, socket, currentUser.userName, roomId, storeUserId])

  const modalCloseHandler = () => {
    setShowNameModal(false);
  }

  const nameSaveHandler = (name) => {
    setShowNameModal(false);
    storeUserName(name);
  }

  return (
    <>
      {showNameModal && <Modal onClose={modalCloseHandler} onNameSave={nameSaveHandler} />}
      <VideoSection />
      <ChatSection />
    </>
  );
};

export default Main;