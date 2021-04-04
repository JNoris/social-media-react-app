//Authors: Athena Kozak
//Styled by: Athena Kozak
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'; 
import {CommentWrapper} from './PostComment.styles'

const PostCommentItem= (props) => {
    
    const comment = props.comment;
    const currentUserName = props.currentUserName;
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        checkForDelete();
    })

    function checkForDelete() {
        if(comment.userName === currentUserName) {
            setShowDelete(true);
        }
    }

    function handleDelete() {
        // if  user's comment, then can delete
        axios.defaults.headers={
            "Content-Type":"application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        axios.post("https://localhost:5001/DeleteComment/" + comment.id, {
            commentID: comment.id,
        })
        .then(console.log("delete success"))
        .catch(err => console.log(err))
         // TODO add refresh to comment list component? Or close modal
         props.handleDelete()
    }

    var deleteHtml = showDelete ? (
        <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <CloseIcon
                id="delete"
            />
        </IconButton>
    </ListItemSecondaryAction>
    ) : null


    return(
        <CommentWrapper>
            <ListItem key={comment.id} className="listItem">
                  <ListItemAvatar>
                    <Link to={{
                        pathname: "/profile/" + comment.userName,
                        state: {userName: comment.userName}
                        }}>
                      <Avatar aria-label="user" src={comment.profilePhotoPath}/>
                    </Link>
                  </ListItemAvatar>
                <ListItemText
                    primary={comment.userName}
                    secondary={comment.text}
                />      
               {deleteHtml}
            </ListItem>
        </CommentWrapper>
    )

}

export default PostCommentItem;