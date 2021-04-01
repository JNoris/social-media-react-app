import React, { useState, useEffect } from "react"; // useState for Hooks
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Notification from "./Notification";
import {
  Button,
  TextField,
  Avatar,
  Link,
  Grid,
  Typography,
  makeStyles
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import styled from 'styled-components';

const SideWrapper = styled.div`
  .MuiGrid-root{
    color:rgba(250,250,250, 0.7);
  }
  a{
    color:rgba(250,250,250, 0.5);
  }
  a:hover {
    text-decoration: none;
    color: #fff;
  }
  .MuiInputBase-root{
    background-color:rgba(250,250,250, 0.5);
  }
  label.Mui-focused{
    color:white;
  }
  svg{
    color:black;
  }
  .MuiButton-root {
    background: linear-gradient(to right, #fcac56 0%,  #fcac56 100%);  
    transition: 0.5s;
    color: #fff;
    border: none;
    margin-top: 1.5rem;
    background-size: 125% auto;
}
.MuiButton-root:hover {
    color: #fff;
    text-decoration: none;
    outline: none;
    background: linear-gradient(to right, #fcac56 0%,  #e2336b 100%); 
}

.MuiInputBase-input {
  color: #fff;
  border-radius: 5px;
}

.MuiInputLabel-outlined {
  color: #e4e4e4;
}


`;

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
  },
  containerStyle: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  // Styling
  const [redirect, setRedirect] = useState(false);
  const [status, setStatus] = useState(0);
  const classes = useStyles();

  // Error handling messages
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // State for username & password
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  

  // Handle username & password
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
    //let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

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
            setStatus(response.status);
            window.localStorage.setItem("token", response.data.token);
            setNotify({
              isOpen: true,
              message: "Logged in successfully",
              type: "success",
            });
          }
        })
        .catch(e => window.alert(e.response.data.message));
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
        handleLoginButton();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  useEffect(() => { 
    if(status===200)
    {
      window.location.reload()
    }
    
  }, [status])

  return (
    <SideWrapper>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
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
                <Link href="/register" to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Notification notify={notify} setNotify={setNotify} />
          </div>
        </Grid>
      </Grid>
    </SideWrapper>
  );
};

export default Login;
