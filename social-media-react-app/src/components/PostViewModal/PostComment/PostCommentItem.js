import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {CommentWrapper} from './PostComment.styles'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'; 

const PostCommentItem= (props) => {

    const comment = props.comment;
    const [user, setUser] = useState([]);

    // TODO implement check to see if A. 'your post' to delete or B. 'your comment'


    // TODO implement delete

    function handleDelete() {
        // if user's post || user's comment delete
    }

    return(
        <CommentWrapper>
            <ListItem key={comment.Id} className="listItem">
                {/* TODO readd once API call is updated */}
                  {/* <ListItemAvatar>
                      <Avatar aria-label="user" src={comment.ProfilePhotoPath}/>
                  </ListItemAvatar> */}
                <ListItemText
                    primary={comment.UserName}
                    secondary={comment.Text}
                />      
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon
                            id="delete"
                            onClick={handleDelete}
                        />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </CommentWrapper>
    )

}

export default PostCommentItem;