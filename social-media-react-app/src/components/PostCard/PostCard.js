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
                    photoPath = {post.photoPath}
                    post={post}
               />
               <PostCardContent
                    userName = {post.userName}
                    profilePhotoPath = {post.profilePhotoPath}
                    numberOfLikes = {post.numberOfLikes}
                    numberOfComments = {post.numberOfComments}
                    post = {post}
                    isLiked = {post.isLiked}
               />
            </Card>
        </CardWrapper>
    );
}

export default PostCard;