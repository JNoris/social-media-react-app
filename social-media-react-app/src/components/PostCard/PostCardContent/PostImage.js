import React, { useState } from 'react';
import CardMedia  from '@material-ui/core/CardMedia';
import {Media} from './PostCardContentStyles';
//temp
import img from '../../temp/postImgs/img5.jpg'

const PostImage = () => {
    return (
        <Media>
            <CardMedia>
                <img src={img} />
            </CardMedia>
        </Media>
    );
}

export default PostImage;