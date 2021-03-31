import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { BtnWrap, Search, SearchWrapper } from './SearchBar.styles';
import IconButton from '@material-ui/core/IconButton';


const SearchBar = () => {
    const [search, setSearch] = useState("");
    const handleSearchEntry = event => {
        setSearch(event.target.value)
    }
    var link = '/profile/' + search;
    useEffect(() => {
        const listener = (event) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      });
    
    
    return (
        <SearchWrapper>
            <Search
                inputProps={{
                    className: "searchinput"
                }}
                placeholder="Search..."
                value={search}
                onChange={handleSearchEntry}
                disableUnderline
            >
            </Search>
            <BtnWrap>
                <Link to={link}>
                    <IconButton ><SearchIcon /></IconButton>
                </Link>
            </BtnWrap>
        </SearchWrapper>
    );
}
export default SearchBar