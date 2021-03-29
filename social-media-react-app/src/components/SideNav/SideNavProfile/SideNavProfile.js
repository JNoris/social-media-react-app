import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import UserInfo from './SideNavProfileComponents/UserInfo';
import DisplayInfo from './SideNavProfileComponents/DisplayInfo';
import { Link } from 'react-router-dom';
import { SideNavProfileWrapper } from '../SideNav.styles';
import Button from '@material-ui/core/Button'

const SideNavProfile = (props) => {
    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState("test")
    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    function loggedInUserInfo() {
        axios.get("https://localhost:5001/getcurrentuserdetails",{

        }).then(res => {console.log(res)});
    }

    return (
        <SideNavProfileWrapper>
            <Button onClick={() => loggedInUserInfo()}>TEST</Button>
            <DisplayInfo
                fullname="Jane Doe"
                userName={userName}
            />
            <Grid container justify="center" spacing={1}>
                <Grid item xs={4}>
                    <Link to={{
                        pathname: "profile",
                        state: {
                            userId: userId
                        }
                    }}>
                        <UserInfo
                            name="Posts"
                            number="46"
                        />
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to={{
                        pathname: "follow",
                        state: {
                            followIndex: 0,
                            userName: userName
                        }
                    }}>
                        <UserInfo
                            name="Followers"
                            number="2800"
                        />
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to={{
                        pathname: "follow",
                        state: {
                            followIndex: 1,
                            userName: userName
                        }
                    }}>
                        <UserInfo
                            name="Following"
                            number="5"
                            link="follow"
                        />
                    </Link>
                </Grid>
            </Grid>
        </SideNavProfileWrapper>
    );
}
export default SideNavProfile;