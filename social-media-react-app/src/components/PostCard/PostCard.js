// eslint-disable-next-line
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import {CardWrapper} from './PostCard.styles'
import PostCardContent from './PostCardContent/PostCardContent'
import PostImage from './PostCardContent/PostImage'


const PostCard = () => {
    return (
        <CardWrapper>
            <Card>
               <PostImage />
               <PostCardContent />
            </Card>
        </CardWrapper>
    );
}

export default PostCard;