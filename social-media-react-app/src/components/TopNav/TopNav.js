import React from 'react';
import { Link } from 'react-router-dom';
import {TopNavWrapper } from './TopNav.styles';
import Button from '@material-ui/core/Button';
import SearchBar from './TopNavComponents/SearchBar'

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
