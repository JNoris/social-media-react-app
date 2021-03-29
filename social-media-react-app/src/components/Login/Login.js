import React, { Component } from "react";
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - calc(100vh - 100%));
  justify-content: center;
  align-items: center;

  p{
      display: block;
  }
`;

class Login extends Component {
    
    state = {
        userName: '',
        passWord: ''
    }

    handleLoginButton = () => {
        
        axios.post(`https://localhost:5001/login`, {
    
            userName: this.state.userName,
            passWord: this.state.passWord,
    
        }).then(response=>{
            if(response.status === 200)
            {
                window.localStorage.setItem('token', response.data.token);
            }        
        });     
    }

    render(){
        return(
            <Wrapper>
                <p>Username</p>
                <input type="text" value={this.state.userName} onChange={(e)=>{this.setState({userName: e.target.value})}}/>
                <p>Password</p>
                <input type="text" value={this.state.passWord} onChange={(e)=>{this.setState({passWord: e.target.value})}}/>

                <input style={{marginTop: "1vh"}} type="button" onClick={this.handleLoginButton} value="Login"/>
            </Wrapper>
        );
    }
}

export default Login;