import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {ContentWrapper} from '../../PostCardContent/PostCardContent.styles'
import PostStats from '../../PostCardContent/PostStats'
import UserInfo from '../../PostCardContent/UserInfo'

const PostCardModalContent = (props) => {

    return (
        <ContentWrapper>
            <CardContent>
                <CardActions disableSpacing>
                    <UserInfo 
                        username={props.username}
                        userProfilePhoto={props.userProfilePhoto}
                    />
                   <PostStats 
                        likes={props.likes}
                        post={props.post}
                   />
                </CardActions>
            </CardContent>
        </ContentWrapper>
    )
}

export default PostCardModalContent;