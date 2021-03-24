// eslint-disable-next-line
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import {CardWrapper} from './PostCard.styles'
import PostCardContent from './PostCardContent/PostCardContent'
import PostImage from './PostCardContent/PostImage'


const PostCard = (props) => {
    
    const post = props.post;

    return (
        <CardWrapper>
            <Card>
               <PostImage 
                    img = {post.img}
               />
               <PostCardContent
                    user = {post.username}
                    likes = {post.likes}
                    comments = {post.comments}
                    post = {post}
               />
            </Card>
        </CardWrapper>
    );
}

export default PostCard;