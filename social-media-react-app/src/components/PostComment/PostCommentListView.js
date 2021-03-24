import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const PostCommentListView = (props) => {
    // TODO API call to get all post comments

    // temp dummy data
    var tempComments = [
        {
            username: "bobbypark123",
            comment: "Nice shot!"
        }, 
        {
            username: "johhny_doe",
            comment: "Wow"
        }, 
        {
            username: "smithyjane93",
            comment: "So pretty!"
        }, 
        {
            username: "bugs_everywhere",
            comment: "some comment"
        }, 
        {
            username: "testing-scrolll",
            comment: "some comment"
        }, 
        {
            username: "more-scroll",
            comment: "some comment"
        }, 
        {
            username: "wut",
            comment: "some comment"
        }, 
    ];

    return (
        <List>
            {tempComments.map((comment) => (
                  <ListItem key = {comment.username} alignItems="flex-start">
                  <ListItemAvatar>
                      <Avatar aria-label="user">RU</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                      primary={comment.username}
                      secondary={comment.comment}
                  />      
              </ListItem>
            ))}
        </List>
    )
}

export default PostCommentListView;