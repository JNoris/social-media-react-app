import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    const viewComments = props.viewComments
 
    var postDataToShow = viewComments ? (
        <PostCardModalContent 
            username={props.userName} 
            userProfilePhoto={props.userProfilePhoto}
            likes = {post.NumberOfLikes}
            post={post}
               />
    ) : (
        <PostCardModalContent 
            username={props.userName} 
            userProfilePhoto={props.userProfilePhoto}
            //TODO call for posts
            //comments = {comments}
            post={post}
               />
    ) ;

    var content = viewComments ? (
        <div>
           <PostCardAddComment postId={post.Id}/>
            <PostCommentListView />
        </div>
    ) : (
        <PostLikeList/>
    )

    return (
        <CardWrapper>
            <Card>
               <PostImage 
                    img = {post.PhotoPath}
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