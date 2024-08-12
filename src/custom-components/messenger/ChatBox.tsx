import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/messenger.module.scss";
import { ChatInterface, MessageInterface } from "@/store/interface";
import user from "@/assets/author.png";
import usePrivateStore from "@/store/privateStore";

interface Props {
  chatDetails: ChatInterface | null;
  messages: Array<MessageInterface>;
}

const ChatBox: React.FC<Props> = ({ chatDetails, messages }) => {
  const { currentUser, sendMessage, selectedChat } = usePrivateStore();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setNewMessage("");
  } ,[selectedChat])

  const formatDate = () => {
    if (chatDetails) {
      let newDate = new Date(chatDetails.createdAt);
      let date = newDate.getDate();
      let month = newDate.getMonth();
      let year = newDate.getFullYear();
      return `${date}/${month}/${year}`;
    } else {
      return "";
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (chatDetails) {
      const messageObj = {
        chatId: chatDetails.id,
        message: newMessage,
      };
      await sendMessage(messageObj);
      setNewMessage("");
    }
  }

  return (
    <div className={styles.chatBox}>
      {/* Chat heading */}
      <div className={styles.chatBoxBody}>
        <div className={`${styles.chatHeading}`}>
          {chatDetails ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="cardProfile">
                  <Image
                    src={
                      chatDetails.dp
                        ? chatDetails.dp
                        : chatDetails.receiver &&
                          chatDetails.receiver.profilePicture
                        ? chatDetails.receiver.profilePicture
                        : user
                    }
                    height={50}
                    width={50}
                    alt="chat"
                    className="rounded-full"
                  />
                </span>
                <h2 className="ml-4">
                  {chatDetails.name
                    ? chatDetails.name
                    : chatDetails.receiver
                    ? chatDetails.receiver.username
                    : ""}
                </h2>
              </div>
              <span className={styles.date}>{formatDate()}</span>
            </div>
          ) : null}
        </div>

        {/* Messages */}
        <div className={styles.messageBox}>
          {messages && messages.length
            ? messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    message.senderId === currentUser?.id
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  {chatDetails?.type==="group" && message.senderId !== currentUser?.id && (
                    <span className={styles.senderName}>
                      {message.senderName}
                    </span>
                  )}
                  <span className={styles.message}>{message.message}</span>
                </div>
              ))
            : null}
        </div>
        <button className={styles.swipeBtn}>
          <i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>
      {/* New Message Input */}
      <div className={styles.chatBoxFooter}>
        <form className={styles.newMessageBox} onSubmit={(e) => handleSubmit(e)}>
          <span>
            <i className="fa-regular fa-smile mr-3"></i>
          </span>
          <input
            placeholder="Type your message here"
            className="relative w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="text-xl bg-white">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
