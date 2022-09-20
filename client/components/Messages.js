//should be able to display chat from sender to receiver

//npm install react-icons --save

import React, { useEffect, useRef, useState } from 'react'
import { connect } from "react-redux";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaMicrophoneAlt } from "react-icons/fa";
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

let socket = io();

const Messages = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const messagesEnd = useRef();

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (text.trim() !== '') {
      socket.emit('message', { id: Date.now(), text, creator: userId });
      setMessages(prevMessages => [...prevMessages, { id: Date.now(), text, creator: userId }]);
      setText('');
    }
  }

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="message-container">
      <div className="message-header">
        <div>
          <IoArrowBackCircleOutline
            style={{ fontSize: 50, color: "#747474" }}
          />
        </div>
        <div>Tiara Andini</div>
        <div>
          <img className="avatar" src={faker.image.avatar()} alt="avatar" />
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
            dangerouslySetInnerHTML={{ __html: message.text }}
          ></div>
        ))}
      </div>
      <div style={{ float:"left", clear: "both" }} ref={messagesEnd}></div>
      <div className="message-footer">
        <div className="message-input-wrapper">
          <div>
            <FaMicrophoneAlt style={{ color: "#b4b4b4", fontSize: 20 }} />
          </div>
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
  return {};
};
const mapDispatch = (dispatch) => {
  return {};
};
export default connect(mapState, mapDispatch)(Messages);
