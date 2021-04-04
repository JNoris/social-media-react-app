import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { Wrapper } from "./Settings.styles";
import {useHistory} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";

function Settings() {
<<<<<<< HEAD
  const [redirect, setRedirect] = useState(false);
  const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
  const [deleteStatus, setDeleteStatus] = useState(false)
=======

  const [deleteStatus, setDeleteStatus] = useState(0);
  const [redirect, setRedirect] = useState(false)
>>>>>>> 60bf300235026a4b8e9744796e81347564cf7421

  const options = [
    {
      header: {
        name: "Account",
      },

      values: [
        {
          name: "Profile",
          description:
            "Your email address is your identity and is used to log in.",
        },
        {
          name: "Password",
          description: "Change your password.",
        },
        {
          name: "Two-factor Authentication",
          description:
            "Enable to give your account an extra layer of security.",
        },
        {
          name: "Deactivate Account",
          description:
            "As per the GDPR act, deactivate your account. You can return to your account later.",
        },
        {
          name: "Delete Account",
          description:
            "As per the GDPR act, delete your account, which will erase all your account data from this site.",
        },
      ],
    },

    {
      header: {
        name: "Application",
      },

      values: [
        {
          name: "Third-party services",
          description:
            "Grant access to external accounts for additional functionality.",
        },
        {
          name: "Authorizations",
          description: "Authorizations you have created.",
        },
        {
          name: "Authorized Applications",
          description:
            "Authorized applications are apps your've permitted to use this Social Media on your behalf.",
        },
      ],
    },

    {
      header: {
        name: "Billing",
      },

      values: [
        {
          name: "Billing Information",
          description: "Manage your billing information",
          tags: ["credit cards"],
        },
        {
          name: "Usage",
          description: "View your usage statistics",
          tags: [],
        },
        {
          name: "Invoices",
          description: "Track your invoices and previous purchases",
          tags: [],
        },
        {
          name: "Invoice Address",
          description:
            "We'll this this address on your invoice, if blank, your bill address will be printed instead",
          tags: [],
        },
      ],
    },

    {
      header: {
        name: "Support",
      },

      values: [
        {
          name: "Help",
          description: "Having trouble",
          tags: [],
        },
        {
          name: "FAQ",
          description: "View Frequently Asked Questions",
          tags: [],
        },
      ],
    },
  ];

  // Used for search bar
  const [visibleOptions, setVisibleOptions] = useState(options);

  // search bar
  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    //console.log("You searched for", value);

    if (value.trim().length === 0) {
      setVisibleOptions(options);
      return;
    }

    const returnedItems = [];

    // Find items in search bar
    visibleOptions.forEach((option, index) => {
      const foundOptions = option.values.filter((item) => {
        // .trim to remove whitespace & search for name or description
        return (
          item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !==
          -1 ||
          item.description
            .toLocaleLowerCase()
            .search(value.trim().toLowerCase()) !== -1
        );
      });

      returnedItems[index] = {
        header: {
          name: option.header.name,
        },
        values: foundOptions,
      };

      if (
        option.header.name
          .toLocaleLowerCase()
          .search(value.trim().toLowerCase()) !== -1
      ) {
        returnedItems[index] = {
          header: {
            name: option.header.name,
          },
          values: options[index].values,
        };
      }
    });

    setVisibleOptions(returnedItems);
  };
  let history = useHistory();

<<<<<<< HEAD
  function handleDeleteUser() {
    axios.defaults.headers={
      "Content-Type":"application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
  }
  axios.post("https://localhost:5001/deleteuser")
  .then(res => setDeleteStatus(res.status))
  .catch(err => console.log(err))
  }

  function returnOnOK(status) {
    if(status === 200) {
      setRedirect(true)}
  }

  useEffect(() => {
    returnOnOK(deleteStatus)
  }, [deleteStatus])
  if(redirect) {
    return <Redirect to="/login" />
  }

=======

  axios.defaults.headers={
    "Content-Type":"application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }

    const handleDeleteUser = () => {
      var deleteUser = window.confirm("Are you sure you want to delete your account?");
      if (deleteUser === true) {
        axios.post("https://localhost:5001/deleteuser")
        .then(res => {
          console.log(res);
          if(res.status === 200) {
            setDeleteStatus(res.status)
          }
        }) .catch(err => console.log(err))
      }
    }

    function returnOnOK(status) {
      if (status === 200) {
          setRedirect(true);
      }
  }
  useEffect(() => {
      returnOnOK(deleteStatus)
  }, [deleteStatus])

  if (redirect) {
    logOut();
      return <Redirect to="/login" />
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
}
  
>>>>>>> 60bf300235026a4b8e9744796e81347564cf7421

  return (
    <Wrapper>
      <Container maxWidth="lg">
        <h1>
          <Button 
          variant="contained" 
          color="primary"
          onClick={()=>history.goBack()}
          >
            Back
          </Button>{" "}
            Settings
        </h1>
        <Input
          type="text"
          disableUnderline
          inputProps={{
            className:"Search"
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          className="search"
          onChange={onChange}
          placeholder="Search..."
        />
        <div>
          {visibleOptions.map((option) => (
            <div key={option.header.name} className="settingheader">
              <h3>{option.header.name}</h3>
              <div>
                {option.values.map((value) => 
                  {console.log(value);
                    if(value.name == "Delete Account") {
                    console.log("yay")
                    return(
                      <div key={value.name}>
                      <ul className="group">
                        <li>
                          <h6 className="link" onClick={handleDeleteUser}>{value.name}</h6>
                          <p>{value.description}</p>
                        </li>
                      </ul>
                    </div>
                    )
                  } else {
                    return(
                      <div key={value.name}>
                      <ul className="group">
                        <li>
                          <h6>{value.name}</h6>
                          <p>{value.description}</p>
                        </li>
                      </ul>
                    </div>
                    )
                  }
                }
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
}

export default Settings;
