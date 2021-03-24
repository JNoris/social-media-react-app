// eslint-disable-next-line
import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {ContentWrapper} from './PostCardContent.styles'
import PostStats from './PostStats'
import UserInfo from './UserInfo'

const PostCardContent = (props) => {
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
                   />
                </CardActions>
            </CardContent>
        </ContentWrapper>
    )
}

export default PostCardContent;