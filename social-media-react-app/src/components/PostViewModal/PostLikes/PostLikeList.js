import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {LikeWrapper, TitleWrapper} from './PostLikeList.styles';

const PostLikeList = (props) => {
    const postId = props.postId;
    const [likes, setLikes] = useState([]);

    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(()=>{
        axios.get("https://localhost:5001/GetLikes/" + postId)
        .then(res => setLikes(res.data))
        .catch(err=>console.log(err))
    },[postId])

    return (
        <div>
            <TitleWrapper>
            <h6>Likes</h6>
            </TitleWrapper>
        <List>
            {likes?.map((like) => (
                <LikeWrapper key={like.id}>
                  <ListItem key={like.id}>
                  <ListItemAvatar>
                      <Avatar aria-label="user" src={like.profilePhotoPath}/>
                  </ListItemAvatar>
                  <ListItemText
                      id="listItem"
                      secondary={like.userName}
                  />      
              </ListItem>
              </LikeWrapper>
            ))}
        </List>
        </div>
    )
}

export default PostLikeList;