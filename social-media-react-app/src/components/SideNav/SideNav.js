import React from 'react'
import { NavWrapper } from './SideNav.styles';
import SideNavList from './SideNavList/SideNavList';
import SideNavProfile from './SideNavProfile/SideNavProfile';
import InstagramIcon from '@material-ui/icons/Instagram';
const SideNav = () => {
    return (
        <NavWrapper>
            <h1><InstagramIcon/> FakeGram</h1>
            <SideNavProfile/>
            <SideNavList/>
        </NavWrapper>
    );
}
export default SideNav