// eslint-disable-next-line
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {ContentComponent} from './PostCardContentStyles'

const UserInfo = () => {
    return (
         <ContentComponent>
            <Avatar aria-label="user">RU</Avatar>
                <p>random.user</p>
        </ContentComponent>
    )
}

export default UserInfo;