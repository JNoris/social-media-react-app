import React from 'react';
import TextField from '@material-ui/core/TextField';
import {FormWrapper} from '../PostCardModalView.styles'

const PostCardComment = (props) => {
    
    const user = props.user;

    return (
        <FormWrapper>
        <form noValidate autoComplete="off">
            <TextField 
                id="filled-full-width"
                //label="Label"
                style={{ margin: 0 }}
                placeholder="Add a comment"
                fullWidth
                margin="normal"
                // InputLabelProps={{
                //     shrink: true,
                // }}
                variant="filled" 
            />
        </form>
        </FormWrapper>
    );
}

export default PostCardComment;