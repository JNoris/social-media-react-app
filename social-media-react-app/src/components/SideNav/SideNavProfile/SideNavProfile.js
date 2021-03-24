// import React, { useState } from 'react';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import UserInfo from './SideNavProfileComponents/UserInfo';
import DisplayInfo from './SideNavProfileComponents/DisplayInfo';

const SideNavProfile = () => {
    //const [userId, setUserId] = useState("");
    return (
        <div>
            <DisplayInfo 
                fullname="Jane Doe"
                userName="testing"
            />
            <Grid container justify="center" spacing={1}>
                <Grid item xs={4}>
                    <UserInfo
                        name="Posts"
                        number="46"
                        link="profile"
                    />
                </Grid>
                <Grid item xs={4}>
                    <UserInfo
                        name="Followers"
                        number="2800"
                        link="follow"
                    />
                </Grid>
                <Grid item xs={4}>
                    <UserInfo
                        name="Following"
                        number="5"
                        link="follow"
                    />
                </Grid>
            </Grid>

        </div>
    );
}
export default SideNavProfile;