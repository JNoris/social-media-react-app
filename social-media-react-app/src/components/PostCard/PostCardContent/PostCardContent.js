// eslint-disable-next-line
import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {ContentWrapper} from './PostCardContent.styles'
import PostStats from './PostStats'
import UserInfo from './UserInfo'

const PostCardContent = (props) => {

    console.log("pcc", props)

    var userHtml = props.userName ? (<UserInfo 
    userName={props.userName} profilePhotoPath={props.profilePhotoPath} /> ) : null

    var statsHtml = props.numberOfLikes >= 0 || props.numberOfComments >= 0 ? ( <PostStats 
        numberOfLikes={props.numberOfLikes}
        numberOfComments={props.numberOfComments}
        post={props.post}
        isLiked={props.isLiked}
        handleUpdate = {props.handleUpdate}
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