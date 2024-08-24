import React from "react";
import Image from "next/image";
import user from "@/assets/author.png";
import { ChatInterface } from "@/store/interface";
import styles from "../../styles/messenger.module.scss";

interface Props {
  chat: ChatInterface;
  setSelectedChat: (chat: ChatInterface) => void;
}

const ChatCard: React.FC<Props> = ({ chat, setSelectedChat }) => {
  const formatDate = () => {
    let newDate = new Date(chat.createdAt);
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    return `${date}/${month}/${year}`;
  };

  const getImageSrc = () => {
    if(chat.type==="group"){
      return chat.dp;
    } else {
      if(chat.receiver && chat.receiver.profilePicture){
        return chat.receiver.profilePicture
      } else {
        return user
      }
    }
  }

  return (
    <div
      className={`${styles.chatCard} flex justify-between`}
      onClick={() => setSelectedChat(chat)}
    >
      <div className="flex">
        <div className={styles.profile}>
          <Image
            src={getImageSrc()}
            height={45}
            width={45}
            alt={chat.name}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col ml-5">
          <span className="capitalize">
            {chat.name
              ? chat.name
              : chat.receiver
              ? chat.receiver.username
              : ""}
          </span>
          <span className="capitalize">{chat.type} Chat</span>
        </div>
      </div>
      <div className="flex justify-start">{formatDate()}</div>
    </div>
  );
};

export default ChatCard;
