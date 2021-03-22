import React from 'react'
import { Center } from './SideNavProfileComponents.styles';

const UserInfo = (props) => {
    return(
        <Center>
            <p>{props.number}</p>
            <p>{props.name}</p>
        </Center>
    );
}
export default UserInfo;