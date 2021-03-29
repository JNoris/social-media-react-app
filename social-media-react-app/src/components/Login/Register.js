import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

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

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    passWord: "",
  };

  inputValidation = () => {
    let res = false;

    // First name, upper or lower case
    let firstNameRegex = /^[a-zA-Z]+$/;
    // Last name, upper or lower case
    let lastNameRegex = /^[a-zA-Z]+$/;
    // Username must be 3-16 characters
    let usernameRegex = /^[a-z0-9_-]{3,16}$/;
    // Password, 6-20 char and must have a number and a special character
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    //   this.state.userName === usernameRegex &&
    //   this.state.passWord === passwordRegex
    if (
      this.state.userName != "" ||
      usernameRegex.test(String(this.state.userName).toLowerCase())
    ) {
      res = true;
    }

    return res;
  };

  handleRegisterButton = () => {
    axios
      .post(`https://localhost:5001/register`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        passWord: this.state.passWord,
      })
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push("/login");
        }
      });
  };

  handleKeypress = (e) => {
    if (e.keyCode === 13 || e.charCode === 13) {
      this.btn.click();
    } else {
      console.log("");
    }
  };

  render() {
    return (
      <Wrapper>
        <p>First Name</p>
        <input
          type="text"
          value={this.state.firstName}
          onChange={(e) => {
            this.setState({ firstName: e.target.value });
          }}
        />
        <p>Last Name</p>
        <input
          type="text"
          value={this.state.lastName}
          onChange={(e) => {
            this.setState({ lastName: e.target.value });
          }}
        />
        <p>Username</p>
        <input
          type="text"
          value={this.state.userName}
          onChange={(e) => {
            this.setState({ userName: e.target.value });
          }}
        />
        <p>Password</p>
        <input
          type="text"
          value={this.state.passWord}
          onChange={(e) => {
            this.setState({ passWord: e.target.value });
          }}
        />

        <input
          style={{ marginTop: "1vh" }}
          type="button"
          onClick={this.handleRegisterButton}
          value="Register"
        />
      </Wrapper>
    );
  }
}

export default Register;
