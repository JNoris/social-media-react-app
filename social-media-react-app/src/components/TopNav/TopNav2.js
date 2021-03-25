import React, { useState } from 'react'
import { TopNavWrapper } from './TopNav.styles';
import SearchBar from './TopNavComponents/SearchBar';

const TopNav = () => {
    return(
        <TopNavWrapper>
            <SearchBar/>
        </TopNavWrapper>
    );
}
export default TopNav