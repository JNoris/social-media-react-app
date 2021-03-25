import React, { useState } from "react";
<<<<<<< HEAD


=======
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { Wrapper } from "./Settings.styles";
import {useHistory} from 'react-router-dom';
>>>>>>> 3c8b657ca53800756c11f43bc467d200dfcc97b2
function Settings() {
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

    console.log("You searched for", value);

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
  return (
    <Wrapper>
      <Container maxWidth="lg">
        <h1>
          <Button 
          variant="contained" 
          color="primary"
          onClick={()=>history.goBack()}
          >
            <span>&lt;</span> Back
          </Button>{" "}
            Settings
        </h1>

        <Input
          type="text"
          disableUnderline
          inputProps={{
            className:"Search"
          }}
          onChange={onChange}
          placeholder="Search..."
        />
        <div>
          {visibleOptions.map((option) => (
            <div key={option.header.name} className="settingheader">
              <h3>{option.header.name}</h3>
              <div>
                {option.values.map((value) => (
                  <div key={value.name}>
                    <ul className="group">
                      <li>
                        <h6>{value.name}</h6>
                        <p>{value.description}</p>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
}

export default Settings;
