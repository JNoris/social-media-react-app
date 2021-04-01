import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./Notification";
import {
  Button,
  TextField,
  Avatar,
  Link,
  Grid,
  Typography,
  Container,
  makeStyles
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Redirect } from "react-router";
import styled from 'styled-components';

const RegisterWrapper = styled.div`
  .MuiInputBase-root{
    background-color:rgba(250,250,250, 0.5);
  }
  .MuiContainer-root{
    background-color:rgba(250,250,250, 0.6);
    padding-bottom:1rem;
    border-radius:1rem;
  }
  .MuiAvatar-root{
    background-color:grey;
  }
  label.Mui-focused{
    color:white;
  }
  svg{
    color:black;
  }
  a{
    color: rgba(0,0,0, 0.6);
  }
  h1{
    color:rgba(0,0,0, 0.6);
    padding-bottom:1rem;
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [fNameErr, setFNameErr] = useState(false);
  const [lNameErr, setLNameErr] = useState(false);
  const [userNameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [btnEnable, setBtnEnable] = useState(true);
  const [redirect, setRedirect] = useState(false);
  // First name, upper or lower case
  const firstNameRegex = /^[a-zA-Z]*$/;
  // Last name, upper or lower case
  const lastNameRegex = /^[a-zA-Z]*$/;
  // Username must be 3-16 characters
  const usernameRegex = /^[a-z0-9_-]{3,16}$/;
  // Password, 6-20 char and must have a number and a special character and caps 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
  const handleUsername = (event) => {
    setUserName(event.target.value);
    if (event.target.value.match(usernameRegex)) {
      setUserNameErr(false);
    }
    else {
      setUserNameErr(true);
    }
  };
  const handlePassword = (event) => {
    setPassWord(event.target.value);
    if (event.target.value.match(passwordRegex)) {
      setPasswordErr(false);
    }
    else {
      setPasswordErr(true);
    }
  };

  const handleFirstname = (event) => {
    setFirstname(event.target.value);
    if (event.target.value.match(firstNameRegex)) {
      setFNameErr(false);
    }
    else {
      setFNameErr(true);
    }
  };
  const handleLastname = (event) => {
    setLastname(event.target.value);
    if (event.target.value.match(lastNameRegex)) {
      setLNameErr(false);
    }
    else {
      setLNameErr(true);
    }
  };

  // Error handling messages
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });




  // Valah-day-shiun
  function inputValidation() {
    let res = false;

    if (
      firstNameRegex.test(firstName) &&
      lastNameRegex.test(lastName) &&
      usernameRegex.test(userName) &&
      passwordRegex.test(passWord)
    ) {
      res = true;
    }

    return res;
  }
  useEffect(() => {
    if (!fNameErr && !lNameErr && !userNameErr && !passwordErr && firstName.length > 0 && lastName.length > 0 && userName.length > 0 && passWord.length > 0) {
      setBtnEnable(false)
    }
  }, [fNameErr, lNameErr, userNameErr, passwordErr, firstName.length, lastName.length, userName.length, passWord.length])

  const handleRegisterButton = () => {
    if (inputValidation()) {
      axios
        .post(`https://localhost:5001/register`, {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          passWord: passWord,
        })
        .then((response) => {
          if (response.status === 200) {
            setNotify({
              isOpen: true,
              message: "Registered successfully",
              type: "success",
            });
            setRedirect(true);
          }
        })
        .catch(e => {console.log(e);
          setNotify({
            isOpen: true,
            message: "Registration unsuccessful",
            type: "error",
          });
        });
    } else {
      //console.log("regex fail")
      setNotify({
        isOpen: true,
        message: "Registration unsuccessful",
        type: "error",
      });
    }
  };

  // Enter button functionality
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        //console.log("??????Enter key was pressed. Run your function.");
        handleRegisterButton();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) {
    return <Redirect to='/login' />
  }
  return (
    <RegisterWrapper>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={handleFirstname}
                autoFocus
                error={fNameErr}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={handleLastname}
                error={lNameErr}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="userName"
                autoComplete="username"
                value={userName}
                onChange={handleUsername}
                helperText="Must be between 3 to 16 characters, and may contain underscores and dashes"
                error={userNameErr}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={passWord}
                onChange={handlePassword}
                helperText="Must be between 6 to 20 characters, contain a number, a capital letter and a special character"
                error={passwordErr}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegisterButton}
            value="Register"
            disabled={btnEnable}
          >
            Sign Up
        </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" to="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      </Container>
    </RegisterWrapper>
  );
};

export default Register;
