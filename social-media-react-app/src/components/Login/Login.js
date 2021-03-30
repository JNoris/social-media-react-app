import React, { useState, useEffect } from "react"; // useState for Hooks
import axios from "axios";
import styled from "styled-components";
import Register from "./Register";
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
  Paper,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              value={userName}
              onChange={handleUsername}
              name="userName"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={passWord}
              onChange={handlePassword}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              value="Login"
              onClick={handleLoginButton}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
