import { Grid } from '@material-ui/core';
import React from 'react'
import { NavWrapper } from './SideNav.styles';
import SideNavProfile from './SideNavProfile/SideNavProfile';

const SideNav = () => {
    return (
        <NavWrapper>
            <h1>FakeGram</h1>
            <SideNavProfile/>
        </NavWrapper>
    );
}
export default SideNav