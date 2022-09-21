//should be able to display chat from sender to receiver

//npm install react-icons --save

import React, { useEffect, useRef, useState } from 'react'
import { connect } from "react-redux";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { faker } from "@faker-js/faker";
import { io } from "socket.io-client";

const otherId = faker.database.mongodbObjectId();
const userId = faker.database.mongodbObjectId();
const mockMessages = [
  { id: 1, text: faker.random.words(), creator: userId },
  { id: 2, text: faker.random.words(), creator: otherId },
  { id: 3, text: faker.random.words(), creator: otherId },
  { id: 4, text: `<img src="${faker.image.animals()}"/>`, creator: otherId },
  { id: 5, text: faker.random.words(), creator: userId },
];

const emojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂",
  "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗",
  "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝",
  "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑",
  "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌",
  "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮",
  "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳",
  "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮",
  "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥",
  "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫",
  "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️",
  "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸",
  "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊",
  "💋", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟",
  "❣️", "💔", "❤️‍🔥", "❤️‍🩹", "❤️", "🧡", "💛",
  "💚", "💙", "💜", "🤎", "🖤", "🤍", "💯", "💢", "💥", "💫",
  "💦", "💨", "🕳️", "💣", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤"
]

const quickEmojis = ['👍', '😍', '🤩', '❤️']

let socket = io();

const roomId = 'mockRooId';

const Messages = ({ user }) => {
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState(mockMessages);

  const messagesEnd = useRef();

  useEffect(() => {
    // TODO Generate roomId according to friends
    socket.emit('createRoom', { roomId })

    socket.on("message", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (directText) => {
    const sendText = directText || text.trim();
    if (sendText !== '') {
      socket.emit('message', { id: Date.now(), text: sendText, creator: userId, roomId });
      setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: sendText, creator: userId }]);
      setText('');
    }
  }

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleEmojiClick = (emoji) => {
    setText(prevText => prevText + emoji);
    setShow(false);
  }

  return (
    <div className="message-container">
      <div className="message-header">
        <div>
          <IoArrowBackCircleOutline
            style={{ fontSize: 50, color: "#747474" }}
          />
        </div>
        <div>{user.username}</div>
        <div>
          <img className="avatar" src={user.avatar} alt="avatar" />
        </div>
      </div>
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={[
              "message-item",
              message.creator === userId ? "me" : "",
            ].join(" ")}
          >
            {message.text}
            {
              message.creator !== userId && (
                <div className="quick-emojis">
                  {
                    quickEmojis.map(emoji =>
                      <div key={emoji}
                           className="quick-emojis-item"
                           onClick={() => sendMessage(emoji)}>
                        {emoji}
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
        ))}
      </div>
      <div style={{ float:"left", clear: "both" }} ref={messagesEnd}></div>
      <div className="message-footer">
        <div className="message-input-wrapper">
          <>
            <BsEmojiSmileFill style={{ color: "#b4b4b4", fontSize: 20, cursor: 'pointer' }} onClick={() => setShow(true)}/>
            {
              show && (
                <>
                  <div className="message-emoji-list">
                    {
                      emojis.map(emoji => <div key={emoji} className="message-emoji-item" onClick={() => handleEmojiClick(emoji)}>{emoji}</div>)
                    }
                  </div>
                  <div className="message-emoji-shadow" onClick={() => setShow(false)}></div>
                </>
              )
            }
          </>
          <div className="message-input">
            <input placeholder="Type message here..." value={text} onChange={e => setText(e.target.value)} />
          </div>
          <div>
            <MdSend style={{ color: "#b3c5e7", fontSize: 20 }} onClick={() => sendMessage()} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.auth
  };
};
const mapDispatch = (dispatch) => {
  return {};
};
export default connect(mapState, mapDispatch)(Messages);
