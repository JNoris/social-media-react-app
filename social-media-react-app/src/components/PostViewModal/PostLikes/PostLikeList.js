import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {LikeWrapper} from './PostLikeList.styles';

const PostLikeList = (props) => {
    // TODO API call to get all post comments

    // temp dummy data
    var tempLikes = [
        {
            username: "bobbypark123",
        }, 
        {
            username: "johhny_doe",
        }, 
        {
            username: "smithyjane93",
        }, 
        {
            username: "bugs_everywhere",
        }, 
        {
            username: "testing-scrolll",
        }, 
        {
            username: "more-scroll",
        }, 
        {
            username: "wut",
        }, 
    ];

    return (
        <List>
            {tempLikes.map((like) => (
                <LikeWrapper>
                  <ListItem key={like.username} alignItems="flex-start">
                  <ListItemAvatar>
                      <Avatar aria-label="user">RU</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                      id="listItem"
                      primary={like.username}
                  />      
              </ListItem>
              </LikeWrapper>
            ))}
        </List>
    )
}

export default PostLikeList;