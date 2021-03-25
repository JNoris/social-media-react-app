import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {Flex} from '../Follow.styles';


const FollowingListItem = (props) => {
    const [isFollowing, setIsFollowing] = useState(true);
    const handleFollow = () => {
        setIsFollowing(true);
        //Api Call
    }
    const handleUnFollow = () => {
        setIsFollowing(false);
        //api call
    }
    return(
        <Flex>
            <Avatar src={props.src} />
            <p>{props.username}</p>
            {isFollowing?
            <Button variant="outlined" 
            onClick={()=> handleUnFollow()}
            >Unfollow</Button>
            :<Button variant="outlined"
            onClick={()=> handleFollow()}
            >Follow</Button>}
        </Flex>
    );
}
export default FollowingListItem
