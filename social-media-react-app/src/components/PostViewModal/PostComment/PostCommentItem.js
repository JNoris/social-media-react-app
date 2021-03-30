import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {CommentWrapper} from './PostComment.styles'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'; 

const PostCommentItem= (props) => {

    const comment = props.comment;
    const [currentUserName, setCurrentUserName] = useState("")
    const [showDelete, setShowDelete] = useState(false);

    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    function getCurrentUserDetails()
    {
        axios.get("https://localhost:5001/getcurrentuserdetails")
        .then(res => setCurrentUserName(res.data.userName))
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getCurrentUserDetails()
        checkForDelete();
    },[])

    function checkForDelete() {
        if(comment.UserName == currentUserName) {
            setShowDelete(true);
        }
    }

    function handleDelete() {
        // if user's post || user's comment delete
        axios.defaults.headers={
            "Content-Type":"application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        axios.post("https://localhost:5001/DeleteComment/" + comment.Id, {
            commentID: comment.Id,
        })
        .then(console.log("delete success"))
        .catch(err => console.log(err))
         // TODO add refresh to comment list component?
    }

    var deleteHtml = showDelete ? (
        <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
            <CloseIcon
                id="delete"
                onClick={handleDelete}
            />
        </IconButton>
    </ListItemSecondaryAction>
    ) : null

    return(
        <CommentWrapper>
            <ListItem key={comment.Id} className="listItem">
                  <ListItemAvatar>
                      <Avatar aria-label="user" src={comment.ProfilePhotoPath}/>
                  </ListItemAvatar>
                <ListItemText
                    primary={comment.UserName}
                    secondary={comment.Text}
                />      
               {deleteHtml}
            </ListItem>
        </CommentWrapper>
    )

}

export default PostCommentItem;