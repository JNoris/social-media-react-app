import React, { useState } from 'react';
import { Card, CardMedia } from '@material-ui/core';
import {CardWrapper, Media} from './PostCard.styles'
import PostCardContent from './PostCardContent/PostCardContent'
import img from '../temp/postImgs/img5.jpg';


const PostCard = () => {
    return (
        <CardWrapper>
            <Card>
                <Media>
                    <CardMedia>
                        <img src={img} />
                    </CardMedia>
                </Media>
               <PostCardContent />
            </Card>
        </CardWrapper>
    );
}

export default PostCard;