import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Followers from './Followers/Followers';
import Following from './Following/Following';
import { FollowWrapper, TabWrapper } from './Follow.styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function tabProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Follow = (props) => {
    var state = {
        followIndex: 0,
        userName: ""
    };
    if (props.location.state !== undefined) {
        state = props.location.state;
    }
    const [isSelf, setIsSelf] = useState(false);
    const [userDetails, setUserDetails] = useState("");
    const [userName, setUserName] = useState("");
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [error, setError] = useState(false);
    const [noUser, setNoUser] = useState(false);
    const [value, setValue] = useState(0);

    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    function getFollows(user) {
        if (user !== "") {
            axios.get("https://localhost:5001/GetFollowers/" + user)
                .then(res => setFollower(res.data))
                .catch(err => setError(true) && console.log(err));
        }
    }
    function getFollowing(user) {
        if (user !== "") {
            axios.get("https://localhost:5001/GetFollowing/" + user)
                .then(res => setFollowing(res.data))
                .catch(err => setError(true) && console.log(err));
        }
    }
    function getUserFollows(user) {
        if (user !== undefined) {
            getFollows(user);
            getFollowing(user);
        }
    }
    function getCurrentUserDetails() {
        axios.get("https://localhost:5001/getcurrentuserdetails")
            .then(res => setUserDetails(res.data))
            .catch(err => setError(true) && console.log(err));
    }
    let url = useParams();
    function checkParams(urlid) {
        if (urlid !== undefined) {
            console.log(url.id);
            setUserName(url.id);
            console.log("not current");
        }
        else {
            if (state.userName !== "") {
                console.log(state.userName);
                getUserFollows(state.userName);
            }
            else {
                getCurrentUserDetails();
            }
            setIsSelf(true);
            console.log("Current user");
        }
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        state.followIndex = newValue;
    };
    useEffect(() => {
        checkParams(url.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url.id]);
    useEffect(() => {
        getUserFollows(userName)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName]);

    useEffect(() => {
        getUserFollows(userDetails.userName)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails])
    useEffect(() => {
        setValue(state.followIndex);
    }, [state.followIndex])


    if (error) {
        return (<div>Error</div>);
    }
    return (
        <FollowWrapper>
            <AppBar position="static" className="tabs">
                <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="follows"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#fcac56"
                        }
                    }}
                >
                    <Tab label="Followers" {...tabProps(0)} />
                    <Tab label="Following" {...tabProps(1)} />
                </Tabs>
            </AppBar>
            <TabWrapper>
                {!isSelf? (<h1>@{userName}</h1>): null}
                <TabPanel value={value} index={0}>
                    <Followers
                        userName={userName}
                        data={follower}
                        isSelf={isSelf}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Following
                        userName={userName}
                        data={following}
                        isSelf={isSelf}
                    />
                </TabPanel>
            </TabWrapper>
        </FollowWrapper>
    );
}
export default Follow