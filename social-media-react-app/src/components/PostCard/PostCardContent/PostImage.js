import React, { useState } from 'react';
import CardMedia  from '@material-ui/core/CardMedia';
import {Media} from './PostCardContent.styles';

const PostImage = (props) => {

    return (
        <Media>
            <CardMedia>
                <img src={props.img} />
            </CardMedia>
        </Media>
    );
}

export default PostImage;