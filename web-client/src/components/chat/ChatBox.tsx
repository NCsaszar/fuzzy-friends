import React, { useState } from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import ScrollToBottom from 'react-scroll-to-bottom';

interface ChatBoxProps {
  mate: Mate;
  user: User;
  currentChat: Chat[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ currentChat, mate, user }) => {
  const [newMessage, setnewMessage] = useState('');

  console.log(user.userId, mate.userId, '1111');

  const sendMessage = async (event) => {
    event.preventDefault();
    let messageData;
    const sendId = user.userId;
    const receiveId = mate.userId;
    console.log(newMessage, 'hi');
    if (newMessage !== '') {
      messageData = { content: newMessage };
      await axios
        .post(
          `http://34.238.117.39:3000/users/${sendId}/messages/${receiveId}`,
          messageData
        )
        .then((data) => {
          // console.log(data);
          setnewMessage('');
          return;
        })
        .catch((err) => {
          console.log('message did not ge sent', err);
        });
    }
  };

  return (
    <div className="m-10 max-w-sm max-h-[90vh] flex flex-col border shadow-md bg-white rounded-lg bg-white border border-gray-200 shadow-md dark:bg-warmGray-700 dark:border-gray- gap-2 content-center">
      <div className="flex items-center justify-between border-b p-5">
        <div className="flex items-center">
          <img className="rounded-full w-10 h-10" src={mate.profilePic} />
          <div className="pl-2">
            <div className="font-semibold">
              <a className="hover:underline" href="#">
                {mate.name}
              </a>
            </div>
            <div className="text-xs text-gray-600">{mate.breed}</div>
          </div>
        </div>
      </div>
      {currentChat.length !== 0 ? (
        <div className="overflow-y-auto max-h-[10vh]">
          <ScrollToBottom>
            {currentChat.map((message) => {
              return (
                <ChatInput
                  key={message._id}
                  message={message}
                  mate={mate}
                  user={user}
                />
              );
            })}
          </ScrollToBottom>
        </div>
      ) : null}
      <div className="flex items-center mb-4 p-4 w-full">
        <form
          className="w-full rounded-full border border-gray-200 px-4"
          onSubmit={(event) => sendMessage(event)}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(event) => {
              setnewMessage(event.target.value);
            }}
            placeholder="Aa"
            autoFocus
          />
        </form>
        <button
          className="inline-flex hover:bg-indigo-50 rounded-full p-2"
          type="button"
          onClick={sendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
