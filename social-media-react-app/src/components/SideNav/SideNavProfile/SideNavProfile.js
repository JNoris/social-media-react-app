import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import UserInfo from './SideNavProfileComponents/UserInfo';
import DisplayInfo from './SideNavProfileComponents/DisplayInfo';
import { Link } from 'react-router-dom';
import { SideNavProfileWrapper } from '../SideNav.styles';

const SideNavProfile = (props) => {
    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState("test")
    return (
        <SideNavProfileWrapper>
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
                        pathname:"follow",
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
                        pathname:"follow",
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