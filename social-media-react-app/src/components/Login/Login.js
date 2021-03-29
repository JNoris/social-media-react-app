import React, { useState, useEffect } from "react"; // useState for Hooks
import axios from "axios";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - calc(100vh - 100%));
  justify-content: center;
  align-items: center;

  p {
    display: block;
  }
`;

const Login = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassWord(event.target.value);
  };

  // This the validation! It's meant to validate stuff!! Go validation!!!
  function inputValidation() {
    let res = false;

    // username must be 3-16 characters
    let usernameRegex = /^[a-z0-9_-]{3,16}$/;
    // Password, 6-20 char and must have a number and a special character
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    if (usernameRegex.test(userName) && passwordRegex.test(passWord)) {
      res = true;
    }

    return res;
  }

  const handleLoginButton = () => {
    if (inputValidation()) {
      axios
        .post(`https://localhost:5001/login`, {
          userName: userName,
          passWord: passWord,
        })
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem("token", response.data.token);
          }
        })
        .catch((e) => window.alert(e));
    } else {
      // TODO: potentially remove
      window.alert("Error");
    }
  };

  // Enter button functionality
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        handleLoginButton();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Wrapper>
      <p>Username</p>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={handleUsername}
      />
      <p>Password</p>
      <input
        type="password"
        placeholder="Password"
        value={passWord}
        onChange={handlePassword}
      />

      <input
        style={{ marginTop: "1vh" }}
        type="button"
        onClick={handleLoginButton}
        value="Login"
      />
    </Wrapper>
  );
};

export default Login;
