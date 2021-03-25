import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { BtnWrap, Search, SearchWrapper } from './SearchBar.styles';
import IconButton from '@material-ui/core/IconButton';


const SearchBar = () => {
    const [search, setSearch] = useState("");
    const handleSearchEntry = event => {
        setSearch(event.target.value)
    }
    const handleSearchPost = () => {
        //redirect with props
    }
    return (
        <SearchWrapper>
            <Search
                inputProps={{
                    className:"searchinput"
                }}
                placeholder="Search..."
                value={search}
                onChange={handleSearchEntry}
                disableUnderline
            >
            </Search>
            <BtnWrap>
                <IconButton><SearchIcon /></IconButton>
            </BtnWrap>
        </SearchWrapper>
    );
}
export default SearchBar