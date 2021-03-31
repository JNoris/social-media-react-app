import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

export const Wrapper = styled.div`
  .entire-body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .main,
  .body {
    height: 100%;
  }

  .main {
    font-family: Arial, Helvetica, sans-serif; /* whatever you want here */
    background: #282a36;
    font-size: 10px;
  }

  .body {
    display: grid;
    place-items: center;
  }

  .chat-container {
    /*
        setting dimensions, once again, have flexiblity
    */
    display: grid;
    grid:
      "search-container chat-title" 71px
      "conversation-list chat-message-list" 1fr
      "new-message-container chat-form" 78px
      / 275px 1fr;
    min-width: 800px;
    max-width: 1000px;
    max-height: 800px;
    width: 100%;
    height: 95vh;
    background: #fff;
    border-radius: 10px;
  }

  .search-container,
  .conversation-list,
  .new-message-container {
    background: #282a34;
  }

  .search-container {
    display: grid;
    align-items: center;
    padding: 0 20px;
    grid-area: search-container;
    border-radius: 10px 0 0 0;
    box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
    z-index: 1;
  }

  .search-container input {
    color: #eee;
    outline: none;
    font-weight: bold;
    border-radius: 2px;
    height: 30px;
    border: 0;
    padding-left: 48px;
    padding-right: 20px;
    font-size: 1.4rem;
    /*
        Import garbage here if you want to go hard
   */
    background: url("") no-repeat rgba(255, 255, 255, 0.3);
    background-position: 15px center;
    background-size: 20px 20px;
  }

  .search-container input::placeholder {
    color: #ddd;
    font-weight: bold;
  }

  .conversation-list {
    grid-area: conversation-list;
    overflow-y: scroll;
  }

  .conversation {
    display: grid;
    grid-template-columns: 40px 1fr max-content;
    grid-gap: 10px;
    color: #ddd;
    font-size: 1.3rem;
    border-bottom: 1px solid #282a34;
    padding: 20px 20px 20px 15px;
  }

  .conversation.active,
  .conversation:hover {
    background: #282a34;
  }

  .conversation:hover {
    cursor: pointer;
  }

  .conversation > img {
    grid-row: span 2;
    height: 40px;
    width: 40px;
    border-radius: 100%;
  }

  .title-text {
    font-weight: bold;
    color: #eee;
    padding-left: 5px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .created-date {
    color: #ddd;
    font-size: 1rem;
  }

  .conversation-message {
    grid-column: span 2;
    padding-left: 5px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .new-message-container {
    display: grid;
    grid: 40px / 40px;
    align-content: center;
    grid-area: new-message-container;
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 0 0 0 10px;
    padding: 0 15px;
  }

  .new-message-container a {
    display: grid;
    place-content: center center;
    background: #eee;
    border-radius: 100%;
    color: #121212; /* Color preference*/
    text-decoration: none;
    font-size: 3.6rem;
  }

  .chat-title,
  .chat-form {
    background: #eee;
  }

  .chat-title {
    display: grid;
    grid: 36px / 1fr 36px;
    align-content: center;
    align-items: center;
    grid-area: chat-title;
    color: #3c3f51;
    font-weight: bold;
    font-size: 2rem;
    border-radius: 0 10px 0 0;
    box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
    padding: 0 20px;
  }

  .chat-title > img {
    cursor: pointer;
  }

  .chat-message-list {
    grid-area: chat-message-list;
    display: flex;
    flex-direction: column-reverse;
    padding: 0 20px;
    overflow-y: scroll;
  }

  .message-row {
    display: grid;
    grid-template-columns: 70%;
    margin-bottom: 20px;
  }

  .message-content {
    display: grid;
  }

  .you-message {
    justify-content: end;
  }

  .you-message .message-content {
    justify-items: end;
  }

  .other-message {
    justify-items: start;
  }

  .other-message .message-content {
    grid-template-columns: 48px 1fr;
    grid-column-gap: 15px;
  }

  /* If adding an image to represent a profile within chat */
  .message-row img {
    border-radius: 100%;
    grid-row: span 2;
  }

  .message-text {
    padding: 9px 14px;
    font-size: 1.6rem;
    margin-bottom: 5px;
  }

  .message-time {
    font-size: 1.3rem;
    color: #777; // Might blend if dark themed
  }

  .you-message .message-text {
    background: #282a34;
    color: #eee;
    border: 1px solid #282a34;
    border-radius: 14px 14px 0 14px;
  }

  .other-message .message-text {
    background: #3c3f51;
    color: #eee;
    border: 1px solid #3c3f51;
    border-radius: 14px 14px 0 14px;
  }

  .chat-form {
    display: grid;
    grid: 51px / 32px 1fr;
    align-content: center;
    align-items: center;
    grid-gap: 15px;
    grid-area: chat-form;
    border-radius: 0 0 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    padding-left: 42px;
    padding-right: 22px;
  }

  .chat-form input {
    outline: none;
    padding: 15px;
    border: 2px solid #ddd;
    color: #330; /* whatever color */
    border-radius: 6px;
    font-size: 1.4rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
