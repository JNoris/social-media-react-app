import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Flex } from '../Follow.styles';
import { Link } from 'react-router-dom'


const FollowingListItem = (props) => {
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    const [isFollowing, setIsFollowing] = useState(true);
    const [error, setError] = useState(false);

    function addFollow(user) {
        if (user !== "") {
            axios.get("https://localhost:5001/AddNewFollow/" + user)
                .then(res => setIsFollowing(true))
                .catch(err => setError(true) && console.log(err));
        }
    }

    function removeFollow(user) {
        if (user !== "") {
            axios.get("https://localhost:5001/RemoveFollow/" + user)
                .then(res => setIsFollowing(false))
                .catch(err => setError(true) && console.log(err));
        }
    }

    var link = '/profile/' + props.username;
    if (error) {

    }
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
                        onClick={() => addFollow()}
                    >Unfollow</Button>
                    : <Button variant="outlined"
                        onClick={() => removeFollow()}
                    >Follow</Button> : <div />
            }
        </Flex>
    );
}
export default FollowingListItem
