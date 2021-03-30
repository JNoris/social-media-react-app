import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {ContentWrapper} from '../../../PostCard/PostCardContent/PostCardContent.styles'
import PostStats from '../../../PostCard/PostCardContent/PostStats'
import UserInfo from '../../../PostCard/PostCardContent/UserInfo'

const PostCardModalContent = (props) => {

    return (
        <ContentWrapper>
            <CardContent>
                <CardActions disableSpacing>
                    <UserInfo 
                        username={props.user}
                    />
                   <PostStats 
                        likes={props.likes}
                        comments={props.comments}
                        post={props.post}
                        modalView={true}
                        isLiked={props.isLiked}
                   />
                </CardActions>
            </CardContent>
        </ContentWrapper>
    )
}

export default PostCardModalContent;