import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {ContentWrapper} from '../../../PostCard/PostCardContent/PostCardContent.styles'
import PostStats from '../../../PostCard/PostCardContent/PostStats'
import UserInfo from '../../../PostCard/PostCardContent/UserInfo'

const PostCardModalContent = (props) => {
    const post = props.post;

    return (
        <ContentWrapper>
            <CardContent>
                <CardActions disableSpacing>
                    <UserInfo 
                        userName={props.userName}
                        profilePhotoPath ={props.profilePhotoPath}
                    />
                   <PostStats 
                        numberOfLikes={post.numberOfLikes}
                        numberOfComments={post.numberOfComments}
                        post={post}
                        modalView={true}
                        isLiked={post.isLiked}
                   />
                </CardActions>
            </CardContent>
        </ContentWrapper>
    )
}

export default PostCardModalContent;