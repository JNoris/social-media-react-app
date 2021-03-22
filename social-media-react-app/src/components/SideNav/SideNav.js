import { Grid } from '@material-ui/core';
import React from 'react'
import { NavWrapper } from './SideNav.styles';
import DisplayInfo from './SideNavProfile/SideNavProfileComponents/DisplayInfo';
import UserInfo from './SideNavProfile/SideNavProfileComponents/UserInfo';

const SideNav = () => {
    return (
        <NavWrapper>
            <h1>asdas</h1>
            <DisplayInfo />
            <Grid container justify="center" spacing={1}>
                <Grid item xs={4}>
                    <UserInfo
                        name="Posts"
                        number="46"
                    />
                </Grid>
                <Grid item xs={4}>
                    <UserInfo
                        name="Followers"
                        number="2800"
                    />
                </Grid>
                <Grid item xs={4}>
                    <UserInfo
                        name="Following"
                        number="5"
                    />
                </Grid>
            </Grid>
        </NavWrapper>
    );
}
export default SideNav