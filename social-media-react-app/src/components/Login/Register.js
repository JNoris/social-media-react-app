import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Login from "./Login";
import { useForm, FieldErrors } from "react-hook-form";
import Notification from "./Notification";
import {
  Button,
  TextField,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
  Snackbar,
  IconButton,
  CloseIcon,
  MuiAlert,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassWord(event.target.value);
  };

  const handleFirstname = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastname = (event) => {
    setLastname(event.target.value);
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

    // First name, upper or lower case
    let firstNameRegex = /^[a-zA-Z]+$/;
    // Last name, upper or lower case
    let lastNameRegex = /^[a-zA-Z]+$/;
    // Username must be 3-16 characters
    let usernameRegex = /^[a-z0-9_-]{3,16}$/;
    // Password, 6-20 char and must have a number and a special character
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

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
            this.props.history.push("/login");
            setNotify({
              isOpen: true,
              message: "Logged in successfully",
              type: "success",
            });
          }
        })
        .catch((e) => window.alert(e.response.data.message));
    } else {
      setNotify({
        isOpen: true,
        message: "Login unsuccessful",
        type: "error",
      });
    }
  };

  // Enter button functionality
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        handleRegisterButton();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
  );
};

export default Register;
