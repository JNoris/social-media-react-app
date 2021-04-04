import React from 'react'
import { NavWrapper } from './SideNav.styles';
import SideNavProfile from './SideNavProfile/SideNavProfile';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from 'react-router-dom';
const SideNav = () => {
    return (
        <NavWrapper>
            <Link to='/'>
                <h1><InstagramIcon/> FakeGram</h1>
            </Link>
            <SideNavProfile/>
        </NavWrapper>
    );
}
export default SideNav