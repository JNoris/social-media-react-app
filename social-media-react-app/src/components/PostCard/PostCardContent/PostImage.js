import React, { useState } from 'react';
import CardMedia  from '@material-ui/core/CardMedia';
import {Media} from './PostCardContentStyles';
import img from "../../temp/postImgs/img1.jpg"

const PostImage = (props) => {
    console.log("props", props)
    return (
        <Media>
            <CardMedia>
                <img src={props.img} />
            </CardMedia>
        </Media>
    );
}

export default PostImage;