import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import {ContentComponent, LinkWrapper} from './PostCardContent.styles'

const UserInfo = (props) => {
    return (
         <ContentComponent>
             <LinkWrapper>
             <Link to={{
                 pathname: "/profile/" + props.userName,
                 state: {userName: props.userName}
                 }}>
                <Avatar aria-label="user" id="avatar" src={props.profilePhotoPath} />
                    <p>{props.userName}</p>
            </Link>
            </LinkWrapper>
        </ContentComponent>
    )
}

export default UserInfo;