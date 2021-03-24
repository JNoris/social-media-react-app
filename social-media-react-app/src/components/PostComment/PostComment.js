import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {CommentWrapper} from './PostComment.styles'


const PostComment = (props) => {
    return (
        <CommentWrapper>
            <Avatar aria-label="user">RU</Avatar>
                <p>{props.username}</p>
                <p>Comment about the lovely post..</p>
        </CommentWrapper>
    )
}

export default PostComment;