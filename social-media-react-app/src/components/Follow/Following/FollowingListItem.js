import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Flex } from '../Follow.styles';
import { Link } from 'react-router-dom'


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
    var link = '/profile/'+ props.username;
    return (
        <Flex>
            <Avatar src={props.src} />

            <div className="center">
                <Link to={link}>
                    <p className="user">@{props.username}</p>
                    <p className="name">{props.fname} {props.lname}</p>
                </Link>
            </div>
            {props.isSelf ?
                isFollowing ?
                    <Button variant="outlined"
                        onClick={() => handleUnFollow()}
                    >Unfollow</Button>
                    : <Button variant="outlined"
                        onClick={() => handleFollow()}
                    >Follow</Button> : <div />
            }
        </Flex>
    );
}
export default FollowingListItem
