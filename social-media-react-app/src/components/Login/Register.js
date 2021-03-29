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

class Register extends Component {

    state = {
        firstName: '',
        lastName: '',
        userName: '',
        passWord: ''
    }

    handleRegisterButton = () => {

        axios.post(`https://localhost:5001/register`, {
    
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            passWord: this.state.passWord,
    
        }).then(response=>{
            if(response.status === 200)
            {
                this.props.history.push('/login')
            }        
        });     
    }


    render(){
        return(
            <Wrapper>
                <p>First Name</p>
                <input type="text" value={this.state.firstName} onChange={(e)=>{this.setState({firstName: e.target.value})}}/>
                <p>Last Name</p>
                <input type="text" value={this.state.lastName} onChange={(e)=>{this.setState({lastName: e.target.value})}}/>
                <p>Username</p>
                <input type="text" value={this.state.userName} onChange={(e)=>{this.setState({userName: e.target.value})}}/>
                <p>Password</p>
                <input type="text" value={this.state.passWord} onChange={(e)=>{this.setState({passWord: e.target.value})}}/>

                <input style={{marginTop: "1vh"}} type="button" onClick={this.handleRegisterButton} value="Register"/>
            </Wrapper>
        );
    }
}

export default Register;