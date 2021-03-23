// eslint-disable-next-line
import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {ContentWrapper} from './PostCardContentStyles'
import PostStats from './PostStats'
import UserInfo from './UserInfo'

const PostCardContent = () => {
    return (
        <ContentWrapper>
            <CardContent>
                <CardActions disableSpacing>
                    <UserInfo />
                   <PostStats />
                </CardActions>
            </CardContent>
        </ContentWrapper>
    )
}

export default PostCardContent;