// eslint-disable-next-line
import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {ContentWrapper} from './PostCardContent.styles'
import PostStats from './PostStats'
import UserInfo from './UserInfo'

const PostCardContent = (props) => {
    var userHtml = props.user ? (<UserInfo 
    username={props.userName} userProfilePhoto={props.userProfilePhoto} /> ) : null

    var statsHtml = props.likes || props.comments ? ( <PostStats 
        likes={props.likes}
        comments={props.comments}
        post={props.post}
   />
   ) : null

    return (
        <ContentWrapper>
            <CardContent>
                <CardActions disableSpacing>
                    {userHtml}
                    {statsHtml}
                </CardActions>
            </CardContent>
        </ContentWrapper>
    )
}

export default PostCardContent;