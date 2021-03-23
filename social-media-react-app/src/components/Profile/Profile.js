import React from 'react'
import { Avatar } from '@material-ui/core';
import test from '../temp/test.png';
import { ProfileWrapper } from './Profile.styles';
//import {useQuery} from 'react-query';

const Profile = (props) => {
    if (props.location.state.userId) {
        console.log(props.location.state.userId);
    }

    return (
        <ProfileWrapper>
            <Avatar className="avatar" alt="test" src={test}></Avatar>
            <p>{props.location.state.userId}</p>
        </ProfileWrapper>
    );
}
export default Profile