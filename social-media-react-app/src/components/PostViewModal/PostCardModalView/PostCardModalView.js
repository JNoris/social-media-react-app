import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import {CardWrapper} from '../../PostCard/PostCard.styles'
import PostImage from '../../PostCard/PostCardContent/PostImage'
import PostCardModalContent from './PostCardModalContent/PostCardModalContent';
import {CaptionWrapper} from './PostCardModalView.styles'
import PostCardAddComment from '../PostComment/PostCardAddComment';
import PostCommentListView from '../PostComment/PostCommentList';
import PostLikeList from '../PostLikes/PostLikeList'

const PostCardModalView = (props) => {

    const post = props.post;
    const user = post.username
    const viewComments = props.viewComments

    // API to get post description + comments
    var postDataToShow = viewComments ? (
        <PostCardModalContent 
                    user = {user}
                    likes = {post.likes}
                    post={post}
               />
    ) : (
        <PostCardModalContent 
                    user = {user}
                    comments = {post.comments}
                    post={post}
               />
    ) ;

    var content = viewComments ? (
        <div>
           <PostCardAddComment user = {user}/>
            <PostCommentListView />
        </div>
    ) : (
        <PostLikeList/>
    )

    return (
        <CardWrapper>
            <Card>
               <PostImage 
                    img = {post.img}
                    modalView = {props.modalView}
               />
                {postDataToShow}
               <CaptionWrapper>
                <p>This will be where the caption goes...</p>
               </CaptionWrapper>
                {content}
            </Card>
        </CardWrapper>
    );
}

export default PostCardModalView;