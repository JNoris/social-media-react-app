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
                    img = {post.PhotoPath}
                    post={post}
               />
               <PostCardContent
                    username = {post.UserName}
                    userProfilePhoto = {post.ProfilePhotoPath}
                    likes = {post.NumberOfLikes}
                    comments = {post.NumberOfComments}
                    post = {post}
               />
            </Card>
        </CardWrapper>
    );
}

export default PostCard;