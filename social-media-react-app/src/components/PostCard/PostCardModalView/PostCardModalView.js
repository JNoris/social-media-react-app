import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import {CardWrapper} from '../PostCard.styles'
import PostImage from '../PostCardContent/PostImage'


const PostCardModalView = (props) => {
    
    const post = props.post;

    return (
        <CardWrapper>
            <Card>
               <PostImage 
                    img = {post.img}
               />
            </Card>
        </CardWrapper>
    );
}

export default PostCardModalView;