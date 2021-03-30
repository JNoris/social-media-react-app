// eslint-disable-next-line
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import {CardWrapper} from './PostCard.styles'
import PostCardContent from './PostCardContent/PostCardContent'
import PostImage from './PostCardContent/PostImage'


const PostCard = (props) => {
    
    const post = props.post;
    console.log(post);

    return (
        <CardWrapper>
            <Card>
               <PostImage 
                    img = {post.photoPath}
                    post={post}
               />
               <PostCardContent
                    username = {post.userName}
                    userProfilePhoto = {post.profilePhotoPath}
                    likes = {post.numberOfLikes}
                    comments = {post.numberOfComments}
                    post = {post}
                    isLiked = {post.isLiked}
               />
            </Card>
        </CardWrapper>
    );
}

export default PostCard;