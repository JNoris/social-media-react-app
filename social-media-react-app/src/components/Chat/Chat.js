import React, { Component } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AttachmentIcon from "@material-ui/icons/Attachment";
import "./Chat.css";

function Chat() {
  return (
    <div className="main">
      <div className="body">
        <div className="chat-container">
          <div className="search-container">
            <input type="text" placeholder="Search"></input>
          </div>
          <div className="conversation-list">
            <div className="conversation">
              {/* Add profile photo here */}
              {/* <img src="images/profiles/.." alt="Edvin Lin" /> */}
              <div className="title-text">Edvin Lin</div>
              <div className="created-date">Mar 24</div>
              <div className="conversation-message">This is a message.</div>
            </div>
          </div>
          <div className="new-message-container">
            <a href="#">+</a>
          </div>
          <div className="chat-title">
            <span>Edvin Lin</span>
            <DeleteOutlineIcon />
          </div>
          <div className="chat-message-list"></div>
          <div className="chat-form">
            <AttachmentIcon />
            <input type="text" placeholder="Type a message"></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
