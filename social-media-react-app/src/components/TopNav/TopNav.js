import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';
// import NewDrop from './TopNavComponents/NewDrop';
import { NavIcon, TopNavWrapper } from './TopNav.styles';
// import SearchBar from './TopNavComponents/SearchBar';


function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <NavIcon
                color="inherit"
                style={{ color: 'red', backgroundColor: 'black' }}
                size="large"
                onClick={() => setOpen(!open)}>
                {props.icon}
            </NavIcon>
            {open && props.children}
        </>
    );
}
const TopNav = () => {
    return (
        <TopNavWrapper>
            <Link to="/add">
                <NavItem icon={<AddIcon />} />
            </Link>
            <Link to="/">
                <NavItem icon={<NotificationsIcon />} />
            </Link>
            <Link to="/chat">
                <NavItem icon={<WhatsAppIcon />} />
            </Link>
            {/* <NavItem icon={<ArrowDropDownIcon />}>
                <NewDrop />
            </NavItem> */}
        </TopNavWrapper>
    );
}
export default TopNav