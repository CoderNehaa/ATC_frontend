import React from 'react'
import styles from "@/styles/messenger.module.scss";
import { Textarea } from "@/components/ui/textarea"
import { ChatInterface, MessageInterface } from '@/store/interface';

interface Props{
    messages:Array<MessageInterface>,
    chatDetails:ChatInterface
}

const ChatBox:React.FC<Props> = ({messages}) => {
  return (
    <div className='p-4 h-full flex flex-col justify-between'>
        {/* Chat heading */}
        <div className={styles.chatHeading}>
          ABC

        </div>
        
        {/* Messages */}
        <div>
          DEF
        {messages && messages.length 
            ?
              (messages.map((message, index) => (
                <div key={index}>
                  {message.message}
                  </div>
              )))
            :null
        }
        </div>

        {/* New Message Input */}
        <div className='relative border rounded-xl w-full flex justify-between items-center p-2 pl-4 pr-4'>
          <span><i className='fa-regular fa-smile mr-3'></i></span>
          <input placeholder='Type your message here' className='relative w-full' />
          <button className='text-xl bg-white'>
            <i className='fa-solid fa-paper-plane'></i>
          </button>
        </div>

    </div>
  )
}

export default ChatBox;


