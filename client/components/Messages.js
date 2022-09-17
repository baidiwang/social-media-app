//should be able to display chat from sender to receiver

//npm install react-icons --save

import React, { useState } from "react";
import { connect } from "react-redux";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { faker } from "@faker-js/faker";

const otherId = faker.database.mongodbObjectId();
const userId = faker.database.mongodbObjectId();
const mockMessages = [
  { id: 1, text: faker.random.words(), creator: userId },
  { id: 2, text: faker.random.words(), creator: otherId },
  { id: 3, text: faker.random.words(), creator: otherId },
  { id: 4, text: `<img src="${faker.image.animals()}"/>`, creator: otherId },
  { id: 5, text: faker.random.words(), creator: userId },
];

const Messages = () => {
  const [messages, setMessages] = useState(mockMessages);

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
      <div className="message-footer">
        <div className="message-input-wrapper">
          <div>
            <FaMicrophoneAlt style={{ color: "#b4b4b4", fontSize: 20 }} />
          </div>
          <div className="message-input">
            <input placeholder="Type message here..." />
          </div>
          <div>
            <MdSend style={{ color: "#b3c5e7", fontSize: 20 }} />
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
