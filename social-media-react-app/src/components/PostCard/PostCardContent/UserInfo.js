// eslint-disable-next-line
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {ContentComponent} from './PostCardContent.styles'

const UserInfo = (props) => {
    return (
         <ContentComponent>
            <Avatar aria-label="user">RU</Avatar>
                <p>{props.username}</p>
        </ContentComponent>
    )
}

export default UserInfo;