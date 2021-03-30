import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Flex } from '../Follow.styles';
import { Link } from 'react-router-dom';

const FollowersListItem = (props) => {
    var link = '/profile/' + props.username;
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
                <Button variant="outlined">Remove</Button>
                : <div />}
        </Flex>
    );
}
export default FollowersListItem
