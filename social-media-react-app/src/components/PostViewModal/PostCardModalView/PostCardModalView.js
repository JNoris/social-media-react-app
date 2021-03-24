import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import {CardWrapper} from '../../PostCard/PostCard.styles'
import PostImage from '../../PostCard/PostCardContent/PostImage'
import PostCardModalContent from './PostCardModalContent/PostCardModalContent';
import {CaptionWrapper} from './PostCardModalView.styles'
import PostCardAddComment from '../PostComment/PostCardAddComment';
import PostCommentListView from '../PostComment/PostCommentListView'

const PostCardModalView = (props) => {
    
    console.log(props )
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
               <PostCardAddComment user = {user}/>
               <PostCommentListView />
            </Card>
        </CardWrapper>
    );
}

export default PostCardModalView;