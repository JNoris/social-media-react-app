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


const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [userResults, setUsersResults] = useState([]);

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

      axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(()=>{
        if(search.length > 2) {
            axios.get("https://localhost:5001/search/" + search)
            .then(res => setUsersResults(res.data))
            .catch(err=>console.log(err));
        } else {
            setUsersResults([])
        }
    },[search]);
    
    console.log(userResults)
    
    return (
        <SearchContainer>
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
        <ResultsWrapper>
         <List>
         {userResults?.map((user) => (
         <LikeWrapper key={user.userName}>
           <ListItem key={user.userName}>
           <ListItemAvatar>
               <Avatar aria-label="user" src={user.profilePhotoPath}/>
           </ListItemAvatar>
           <ListItemText
               id="listItem"
               secondary={user.userName}
           />      
       </ListItem>
       </LikeWrapper>
     ))}
 </List>
 </ResultsWrapper>
 </SearchContainer>
    );
}
export default SearchBar