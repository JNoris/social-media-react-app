import { Avatar } from '@material-ui/core';
import React from 'react'
import test from '../temp/test.png';
import { ProfileWrapper } from './Profile.styles';

const Profile = (props) => {
    return (
        <ProfileWrapper>
            <Avatar className="avatar" alt="test" src={test}></Avatar>
            <p>{props.test}</p>
        </ProfileWrapper>
    );
}
export default Profile