import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {Flex} from '../Follow.styles';


const FollowersListItem = (props) => {
    return(
        <Flex>
            <Avatar src={props.src} />
            <p>{props.username}</p>
            <Button variant="outlined">Remove</Button>
        </Flex>
    );
}
export default FollowersListItem
