import React, { useState } from 'react';
import {CardContent, CardActions, Avatar } from '@material-ui/core';
import {ContentWrapper, ContentComponent } from './PostCardContentStyles'
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