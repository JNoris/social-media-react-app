import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const FollowingListItem = (props) => {
    const [isFollowing, setIsFollowing] = useState(false);
    return(
        <div className="flex">
            <Avatar></Avatar>
            <p>{props.username}</p>
            <Button></Button>
        </div>
    );
}
export default FollowingListItem
