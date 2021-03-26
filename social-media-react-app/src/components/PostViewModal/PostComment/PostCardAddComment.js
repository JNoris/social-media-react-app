import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {FormWrapper, ButtonWrapper} from '../PostCardModalView/PostCardModalView.styles'

const PostCardAddComment = (props) => {
    
    const user = props.user;

    const handlePostComment = () => {
        // TODO API call to post comment + refresh view
    }

    return (
        <FormWrapper>
        <form noValidate autoComplete="off">
            <TextField 
                id="filled-full-width"
                style={{ margin: 0 }}
                placeholder="Add a comment"
                fullWidth
                margin="normal"
                variant="filled" 
            />
            <ButtonWrapper>
                <Button id="submitButton" onClick={handlePostComment}>Post</Button>
            </ButtonWrapper>
        </form>
        </FormWrapper>
    );
}

export default PostCardAddComment;