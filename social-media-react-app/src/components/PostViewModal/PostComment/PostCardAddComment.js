//Authors: Athena Kozak
//Styled by: Athena Kozak
import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {FormWrapper, ButtonWrapper} from '../PostCardModalView/PostCardModalView.styles'

const PostCardAddComment = (props) => {
    const postId = props.postId;
    const [comment, setComment] = useState("")

    const handleCommentChange =(event) => {
        setComment(event.target.value);
    }

    const handlePostComment = () => {
        if(comment.trim().length > 0) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
                axios.post("https://localhost:5001/AddComment/" + postId, {
                    CommentText: comment,
                    postId: postId
                })
                .then(console.log("success"))
                .catch(err => console.log(err))
                props.onClose();
        }       
        else {
            setComment("");
        }
    }

    return (
        <FormWrapper>
        <form noValidate autoComplete="off">
            <TextField 
                id="filled-full-width"
                style={{ margin: 0 }}
                placeholder="Add a comment"
                fullWidth
                multiline
                margin="normal"
                variant="filled"
                value={comment} 
                onChange={handleCommentChange}
            />
            <ButtonWrapper>
                <Button id="submitButton" onClick={() => handlePostComment()}>Post</Button>
            </ButtonWrapper>
        </form>
        </FormWrapper>
    );
}

export default PostCardAddComment;