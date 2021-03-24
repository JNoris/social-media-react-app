import React, { useState } from 'react';


const PostCommentListView = (props) => {
    return (
        <CommentWrapper>
            <Avatar aria-label="user">RU</Avatar>
                <p>{props.username}</p>
                <p>Comment about the lovely post..</p>
        </CommentWrapper>
    )
}

export default PostCommentListView;