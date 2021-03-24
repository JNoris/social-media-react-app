import React from 'react';
import TextField from '@material-ui/core/TextField';
import {FormWrapper} from '../PostCardModalView/PostCardModalView.styles'

const PostCardAddComment = (props) => {
    
    const user = props.user;

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
        </form>
        </FormWrapper>
    );
}

export default PostCardAddComment;