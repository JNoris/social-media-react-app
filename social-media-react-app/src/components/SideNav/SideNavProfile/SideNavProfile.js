import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import UserInfo from './SideNavProfileComponents/UserInfo';
import DisplayInfo from './SideNavProfileComponents/DisplayInfo';
import { Link } from 'react-router-dom';
import { SideNavProfileWrapper } from '../SideNav.styles';

const SideNavProfile = () => {
   
    const [userId, setUserId] = useState("");

    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(()=>{
        axios.get("https://localhost:5001/getcurrentuserdetails")
        .then(res => setUserId(res.data))
        .catch(err=>console.log(err))
    },[])

    const fullname = userId.firstName + " " + userId.lastName;

    return (
        <SideNavProfileWrapper>
            <DisplayInfo
                fullname={fullname}
                userName={userId.userName}
                src={userId.profilePhotoPath}
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
                            number={userId.numberOfPosts}
                        />
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to={{
                        pathname: "follow",
                        state: {
                            followIndex: 0,
                            userName: userId.userName
                        }
                    }}>
                        <UserInfo
                            name="Followers"
                            number={userId.numberOfFollowers}
                        />
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to={{
                        pathname: "follow",
                        state: {
                            followIndex: 1,
                            userName: userId.userName
                        }
                    }}>
                        <UserInfo
                            name="Following"
                            number={userId.numberOfFollowing}
                        />
                    </Link>
                </Grid>
            </Grid>
        </SideNavProfileWrapper>
    );
}
export default SideNavProfile;