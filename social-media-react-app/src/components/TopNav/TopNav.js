import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AddIcon from '@material-ui/icons/Add';
import { NavIcon, TopNavWrapper } from './TopNav.styles';
import SearchBar from './TopNavComponents/SearchBar';


function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <NavIcon
                color="inherit"
                style={{ color: 'white', backgroundColor: '#282A34' }}
                size="medium"
                onClick={() => setOpen(!open)}>
                {props.icon}
            </NavIcon>
            {open && props.children}
        </>
    );
}
const TopNav = () => {
    return (
        <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}><SearchBar/></Grid>
            <Grid item xs={4}>
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
                </TopNavWrapper>
            </Grid>
        </Grid>
    );
}
export default TopNav