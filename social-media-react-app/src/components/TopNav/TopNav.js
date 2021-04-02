import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavIcon, TopNavWrapper } from './TopNav.styles';
import Button from '@material-ui/core/Button';
import SearchBar from './TopNavComponents/SearchBar'

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <NavIcon
                color="inherit"
                style={{ color: 'red', backgroundColor: 'black' }}
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
        <TopNavWrapper>
            <SearchBar />
            <Link to="/add">
                <Button variant="contained">Add Photo</Button>
            </Link>
        </TopNavWrapper>
    );
}
export default TopNav