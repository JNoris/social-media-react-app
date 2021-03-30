import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Flex } from '../Follow.styles';
import { Link } from 'react-router-dom';

const FollowersListItem = (props) => {
    var link = '/profile/' + props.username;
    const [deleted, setDeleted] = useState(false);
    function deleteFollow(user) {
        if (user !== "") {
            axios.post("https://localhost:5001/SelfRemoveFollow/" + user)
                .then(res => setDeleted(true))
                .catch(err => console.log(err));
        }
    }
    return !deleted ? (
        <Flex>
            <Avatar src={props.src} />
            <div className="center">
                <Link to={link}>
                    <p className="user">@{props.username}</p>
                    <p className="name">{props.fname} {props.lname}</p>
                </Link>
            </div>
            {props.isSelf ?
                <Button variant="outlined" onClick={() => deleteFollow(props.username)}>Remove</Button>
                : <div />}
        </Flex>
    ) : null;
}
export default FollowersListItem
