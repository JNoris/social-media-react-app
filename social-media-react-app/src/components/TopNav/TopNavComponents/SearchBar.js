import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { BtnWrap, Search, SearchWrapper, LikeWrapper, SearchContainer, ResultsWrapper } from './SearchBar.styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";


const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [userResults, setUsersResults] = useState([]);

    const handleSearchEntry = event => {
        setSearch(event.target.value)
    }

      axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(()=>{
        if(search.length > 2) {
            axios.get("https://localhost:5001/search/" + search)
           // .then(res => setUsersResults(res.data), console.log(userResults))
           .then(res => {
               console.log(res)
               if(!res.data.message) {
                   setUsersResults(res.data)
               } else {
                   setUsersResults([])
               }
           })
            .catch(err=>console.log(err))
        } else {
            setUsersResults([])
        }
    },[search]);
    
    return (
        <SearchContainer>
        <SearchWrapper>
        <Input
          type="text"
          disableUnderline
          inputProps={{
            className:"Search"
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          className="search"
          onChange={handleSearchEntry}
          placeholder="Search..."
        />
        </SearchWrapper>
        <ResultsWrapper>
         <List>
         {userResults?.map((user) => (
         <LikeWrapper key={user.userName}>
             <Link to={{
                 pathname: "/profile/" + user.userName,
                 state: {userName: user.userName}}}>
           <ListItem key={user.userName}>
           <ListItemAvatar>
               <Avatar aria-label="user" src={user.profilePhotoPath}/>
           </ListItemAvatar>
           <ListItemText
               id="listItem"
               secondary={user.userName}
           />      
       </ListItem>
       </Link>
       </LikeWrapper>
     ))}
 </List>
 </ResultsWrapper>
 </SearchContainer>
    );
}
export default SearchBar