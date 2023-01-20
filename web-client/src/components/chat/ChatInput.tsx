import React, { useState, FormEvent } from 'react';
// import { BsEmojiSmileFill } from 'react-icons/bs';
// import { IoMdSend } from 'react-icons/io';
// import Picker, { EmojiClickData } from 'emoji-picker-react';

interface ChatInputProps {
  // handleSendMsg: (msg: string) => void;
  mate: Mate;
  user: User;
  message: Chat;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, mate, user }) => {
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const handleEmojiPickerhideShow = () => {
  //   setShowEmojiPicker(!showEmojiPicker);
  // };

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
  //   let message = msg;
  //   message += emoji.emoji;
  //   setMsg(message);
  // };
  if (message.senderId === user.userId) {
    return (
      <div className="flex items-center flex-row-reverse mb-4 p-5 overflow-y-auto">
        <div className="flex-none flex flex-col items-center space-y-1 ml-4">
          <img className="rounded-full w-10 h-10" src={user.pictures[0]} />
          <a href="#" className="block text-xs hover:underline">
            {user.name}
          </a>
        </div>
        <div className="flex-1 bg-[#714E2F] text-white p-2 rounded-lg mb-2 relative">
          <div>{message.messageContent}</div>
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-[#714E2F]"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center mb-4 p-5 overflow-y-auto">
        <div className="flex-none flex flex-col items-center space-y-1 mr-4">
          <img className="rounded-full w-10 h-10" src={mate.pictures[0]} />
          <a href="#" className="block text-xs hover:underline">
            {mate.name}
          </a>
        </div>
        <div className="flex-1 bg-[#f3ece9] text-gray-800 p-2 rounded-lg mb-2 relative">
          <div>{message.messageContent}</div>
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-[#f3ece9]"></div>
        </div>
      </div>
    );
  }
};

export default ChatInput;

// return (
//   <div>
//     <div className="button-container">
//       <div className="emoji">
//         <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
//         {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
//       </div>
//     </div>
//     <form className="input-container" onSubmit={(event) => sendChat(event)}>
//       <input
//         type="text"
//         placeholder="Aa"
//         onChange={(e) => setMsg(e.target.value)}
//         value={msg}
//       />
//       <button type="submit">
//         <IoMdSend />
//       </button>
//     </form>
//   </div>
// );
