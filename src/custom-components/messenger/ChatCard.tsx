import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from "../../styles/messenger.module.scss";
import user from "@/assets/author.webp";
import { ChatInterface } from '@/store/interface';

interface Props {
    chat:ChatInterface,
    setSelectedChat:(chat:ChatInterface) => void
}

const ChatCard:React.FC<Props> = ({chat, setSelectedChat}) => {
    const [date, setDate] = useState("");
    
    useEffect(() => {
        formatDate();
    }, []);

    const formatDate = () => {
        let newDate = new Date(chat.createdAt);
        let date = newDate.getDate();
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        setDate(`${date}/${month}/${year}`);
    }

  return (
    <div className={`${styles.chatCard} flex justify-between`} onClick={() => setSelectedChat(chat)}>
        <div className='flex'>
            <div className={styles.profile}>
                <Image src={chat.dp?chat.dp:user} height={100} width={25} alt='chat'/>
            </div>
            <div className='flex flex-col ml-5'>
                <span className='capitalize'>{chat.name?chat.name:"John Doe"}</span>
                <span className='capitalize'>{chat.type} Chat</span>
            </div>
        </div>
        <div className='flex justify-start'>
            {date}
        </div>
    </div>
  )
}

export default ChatCard


