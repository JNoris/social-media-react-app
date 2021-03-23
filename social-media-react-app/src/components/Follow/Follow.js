import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Followers from '../Followers/Followers';
import Following from '../Following/Following';
import { FollowWrapper } from './Follow.styles';

const Follow = () => {
    const [index, setIndex] = useState(0);

    const handleChange = (event, value) => {
        setIndex(value);
    }

    const handleChangeIndex = ind => {
        setIndex(ind)
    };

    return (
        <FollowWrapper>
            <Tabs className="tabs" variant="fullWidth" value={index} onChange={handleChange}>
                <Tab label="Followers" />
                <Tab label="Following" />
            </Tabs>
            <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                <Followers></Followers>
                <Following></Following>
            </SwipeableViews>
        </FollowWrapper>
    );
}


export default Follow;