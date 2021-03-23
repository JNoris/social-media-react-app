import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import img from '../temp/postImgs/img5.jpg';
import {CardWrapper, Media, ContentWrapper, ContentComponent, PostActions} from './PostCard.styles'
import { CardActions } from '@material-ui/core';

const PostCard = () => {
    return (
        <CardWrapper>
            <Card>
                <Media>
                    <CardMedia>
                        <img src={img} />
                    </CardMedia>
                {/* <CardMedia 
                    // image="../temp/postImgs/img5.jpg"
                    // image={img}
                    // title="beach"
                /> */}
                </Media>
                <ContentWrapper>
                <CardContent>
                    <CardActions disableSpacing>
                        <ContentComponent>
                            <Avatar aria-label="user">RU</Avatar>
                            <p>random.user</p>
                        </ContentComponent>
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
                    </CardActions>
                 </CardContent>
                </ContentWrapper>
            </Card>
        </CardWrapper>
    );
}

export default PostCard;