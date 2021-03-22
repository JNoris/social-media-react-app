import React from 'react'
import { Center } from './UserInfo.styles';

const UserInfo = (props) => {
    return(
        <Center>
            <p>{props.number}</p>
            <p>{props.name}</p>
        </Center>
    );
}
export default UserInfo;