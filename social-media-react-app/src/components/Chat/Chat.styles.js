import styled from "styled-components";
//import SearchIcon from "@material-ui/icons/Search";

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
    font-family: 'Roboto', sans-serif; /* whatever you want here */
    background: #3c3f51;
    font-size: 1rem;
    margin: 2rem auto;
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
    height: 100vh;
    //background: #fff;
    border-radius: 10px;
  }

  .search-container,
  .conversation-list,
  .new-message-container {
    background: rgba(39,43,52,.9);
  }

  .search-container {
    display: grid;
    align-items: center;
    padding: 0 20px;
    grid-area: search-container;
   background-color: rgba(39,43,52,.9);
   border-radius: 10px 0 0 0;
  // box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
    z-index: 1;
  }

  .search-container input {
    color: #eee;
    outline: none;
    font-weight: 400;
    border-radius: 5px;
    height: 2rem;
    border: 0;
    padding-left: 10px;
    padding-right: 20px;
    font-size: 1rem;
    background: url("") no-repeat rgba(255, 255, 255, 0.1);
    background-position: 15px center;
    background-size: 20px 20px;
  }

  .search-container input::placeholder {
    color: #ddd;
    font-weight: normal;
  }

  .conversation-list {
    grid-area: conversation-list;
    //overflow-y: scroll;
    background-color: rgba(39,43,52,.9);
  }

  .conversation {
    //display: grid;
    //grid-template-columns: 40px 1fr max-content;
    display: flex;
    flex-direction: column;
    //grid-gap: 10px;
    color: #ddd;
    font-size: 1rem;
    border-bottom: 1px solid #282a34;
    padding: 20px 20px 20px 15px;
  }

  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .conversation.active,
  .conversation:hover {
    background-color: rgba(0,0,0,.2);
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
    font-weight: 400;
    color: #eee;
    padding-left: 5px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .created-date {
    color: #ddd;
    font-size: .8rem;
  }

  .conversation-message {
    grid-column: span 2;
    padding-left: 5px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    font-size: .8rem;
    color: #fff;
  }

  .new-message-container {
    display: grid;
    grid: 40px / 40px;
    align-content: center;
    grid-area: new-message-container;
    //border-top: 1px solid rgba(0, 0, 0, 0.25);
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
    color: #fff;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 0 10px 0 0;
    box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.75);
    padding: 0 20px;
    background-color: rgba(39,43,52,.9);
  }

  .chat-title > img {
    cursor: pointer;
  }

  .chat-message-list {
    grid-area: chat-message-list;
    display: flex;
    flex-direction: column-reverse;
    padding: 0 20px;
    //overflow-y: scroll;
    background-color: rgba(255,255,255,.1);
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
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  .message-time {
    font-size: 1rem;
    color: #ccc; // Might blend if dark themed
    text-align: right;
    padding-right: .5rem;
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
    font-size: 1rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
