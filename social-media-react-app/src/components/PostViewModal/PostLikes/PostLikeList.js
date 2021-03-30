import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {LikeWrapper, TitleWrapper} from './PostLikeList.styles';

const PostLikeList = (props) => {
    const post = props.post;
    const [likes, setLikes] = useState([]);

    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(()=>{
        axios.get("https://localhost:5001/GetLikes/" + post.Id)
        .then(res => setLikes(res.data))
        .catch(err=>console.log(err))
    },[])

    return (
        <div>
            <TitleWrapper>
            <h6>Likes</h6>
            </TitleWrapper>
        <List>
            {likes?.map((like) => (
                <LikeWrapper>
                  <ListItem key={like.Id}>
                  <ListItemAvatar>
                      <Avatar aria-label="user" src={like.ProfilePhotoPath}/>
                  </ListItemAvatar>
                  <ListItemText
                      id="listItem"
                      secondary={like.UserName}
                  />      
              </ListItem>
              </LikeWrapper>
            ))}
        </List>
        </div>
    )
}

export default PostLikeList;