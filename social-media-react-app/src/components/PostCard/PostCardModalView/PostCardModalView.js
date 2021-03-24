import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import {CardWrapper} from '../PostCard.styles'
import PostImage from '../PostCardContent/PostImage'
import PostCardModalContent from './PostCardModalContent/PostCardModalContent';
import {CaptionWrapper} from './PostCardModalView.styles'
import PostCardComment from './PostCardModalContent/PostCardComment';


const PostCardModalView = (props) => {
    
    const post = props.post;
    const user = post.username

    // API to get post description + comments

    return (
        <CardWrapper>
            <Card>
               <PostImage 
                    img = {post.img}
               />
               <PostCardModalContent 
                    user = {user}
                    likes = {post.likes}
               />
               <CaptionWrapper>
                <p>This will be where the caption goes...</p>
               </CaptionWrapper>
               <PostCardComment user = {user}/>
            </Card>
        </CardWrapper>
    );
}

export default PostCardModalView;