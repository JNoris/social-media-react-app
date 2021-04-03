import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { Absolute, BtnWrap, Search, SearchWrapper } from './SearchBar.styles';
import IconButton from '@material-ui/core/IconButton';
import SearchListItem from './SearchListItem';
import Grid from '@material-ui/core/Grid';


const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [empty, setEmpty] = useState(true);
    const handleData = (data) => {
        if(Array.isArray(data))
        {
            setUsers(data);
        }
    }
    const getUsers = (search) => {
        if (search !== "" && search !== null && search !== undefined) {
            axios.get(`https://localhost:5001/search/${search}`)
                .then(res => handleData(res.data))
                .then(setEmpty(false))
                .catch(e => console.log(e));
        }
    }
    const handleEmptySearch = (search) => {
        if(search === "")
        {
            setUsers([]);
            setEmpty(true);
        }
    }
    const handleSearchEntry = event => {
        setSearch(event.target.value);
    }
    useEffect(() => {
        handleEmptySearch(search);
    },[search])
    useEffect(() => {
        getUsers(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])
    var link = `/profile/${search}`;
    return (
        <Absolute>
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
            {!empty? (<Grid container>
                {users?.map(user => (
                    <Grid item xs={12}
                    key={user.userName} 
                    value={user.userName}          
                    >
                        <SearchListItem
                            setSearch={setSearch}
                            value={user.userName}
                            src={user.profilePhotoPath}
                            name={user.userName}
                            fname={user.firstName}
                            lname={user.lastName}
                        />
                    </Grid>
                ))}
            </Grid>)
            :null}            
        </Absolute>
    );
}
export default SearchBar