import styled from 'styled-components';

export const Wrapper = styled.div`
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
    Import profile photos here if you want to go hard on the dummy data
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
}

.conversation {
  color: #ddd;
  font-size: 1.3rem;
  border-bottom: 1px solid #282a34;
  padding: 20px 20px 20px 15px;
}

.conversation.active,
.conversation:hover {
  background: #282a34;
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

`;