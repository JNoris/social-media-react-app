import React from 'react';
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
            userName={post.userName} 
            profilePhotoPath={post.profilePhotoPath}
            numberOfLikes = {post.numberOfLikes}
            post={post}
               />
    ) : (
        <PostCardModalContent 
            userName={post.userName} 
            profilePhotoPath={post.profilePhotoPath}
            post={post}
        />
    ) ;

    var content = viewComments ? (
        <div>
           <PostCardAddComment postId={post.id} onClose={props.onClose}/>
            <PostCommentListView postId={post.id} userName={post.userName}  />
        </div>
    ) : (
        <PostLikeList postId={post.id} />
    )

    return (
        <CardWrapper>
            <Card>
               <PostImage 
                    photoPath = {post.photoPath}
                    modalView = {props.modalView}
                    alt = {post.caption}
               />
                {postDataToShow}
               <CaptionWrapper>
                <p>{post.caption ? post.caption : null}</p>
               </CaptionWrapper>
                {content}
            </Card>
        </CardWrapper>
    );
}

export default PostCardModalView;