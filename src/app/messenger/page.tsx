"use client";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import ChatCard from "@/custom-components/messenger/ChatCard";
import usePrivateStore from "@/store/privateStore";
import NewChatDialog from "@/custom-components/messenger/NewChatDialog";
import styles from "@/styles/messenger.module.scss";
import ChatBox from "@/custom-components/messenger/ChatBox";
import { MessageInterface } from "@/store/interface";

const socket = io("http://localhost:3200");

const page = () => {
  const { getChats, chats, currentUser, getMessages } = usePrivateStore();
  const [showNewChatBox, setShowNewChatBox] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>();
  const [messages, setMessages] = useState<Array<MessageInterface>>([]);
  
  async function fetchData() {
    const messagesList = await getMessages(selectedChat.id);
    setMessages(messagesList);
  }

  useEffect(() => {
    getChats();

    socket.on("sendMessage", () => {
      console.log("client connectd for sendMessage");
    });
  }, [currentUser]);


  useEffect(() => {
    if(selectedChat){      
      fetchData();
    }
  }, [selectedChat]);

  return (
    <div className={styles.messengerPage}>
      <div className={styles.left}>
        <div className="flex justify-between">
          <h2>Chats</h2>
          <NewChatDialog setShowNewChatBox={setShowNewChatBox}/>
        </div>
        {chats && chats.length ? (
          <div>
            {chats.map((chat) => (
              <ChatCard chat={chat} setSelectedChat={setSelectedChat} />
            ))}
          </div>
        ) : null}
      </div>
      <div className={styles.right}>
        <ChatBox chatDetails={selectedChat} messages={messages} />
      </div>
    </div>
  );
};

export default page;
