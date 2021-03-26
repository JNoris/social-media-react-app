import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AttachmentIcon from "@material-ui/icons/Attachment";
import {Wrapper} from './Chat.styles';

function Chat() {
  return (
    <Wrapper>
    <div className="main">
      <div className="body">
        <div className="chat-container">
          <div className="search-container">
            <input type="text" placeholder="Search"></input>
          </div>
          <div className="conversation-list">
            <div className="conversation">
              {/* Add profile photo here */}
              {/* <img src="images/profiles/.." alt="Noris Buriac" /> */}
              <div className="title-text">Noris Buriac</div>
              <div className="created-date">Mar 24</div>
              <div className="conversation-message">This is a message.</div>
            </div>
          </div>
          <div className="new-message-container">
            {/* CSS Error on the + sign for some reason. */}
            <a href="#">+</a>
          </div>
          <div className="chat-title">
            <span>Noris Buriac</span>
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
    </Wrapper>
  );
}

export default Chat;
