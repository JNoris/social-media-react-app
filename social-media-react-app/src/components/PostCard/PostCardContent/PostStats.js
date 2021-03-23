import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {ContentComponent, PostActions} from './PostCardContentStyles'

const PostStats = () => {
    return (
        <PostActions>
            <ContentComponent>
                <FavoriteBorderIcon />
                    <p>311</p>
            </ContentComponent>
            <ContentComponent>
                <ChatBubbleOutlineIcon />
                    <p>24</p>
                </ContentComponent>
        </PostActions>
    )
}

export default PostStats;