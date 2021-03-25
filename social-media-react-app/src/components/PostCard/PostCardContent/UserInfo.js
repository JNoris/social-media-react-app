// eslint-disable-next-line
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import {ContentComponent, LinkWrapper} from './PostCardContent.styles'

const UserInfo = (props) => {
    return (
         <ContentComponent>
             <LinkWrapper>
             <Link to={{
                 pathname: "/profile",
                 state: {userName: props.username}
                 }}>
                <Avatar aria-label="user" id="avatar">RU</Avatar>
                    <p>{props.username}</p>
            </Link>
            </LinkWrapper>
        </ContentComponent>
    )
}

export default UserInfo;