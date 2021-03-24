import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Followers from './Followers/Followers';
import Following from './Following/Following';
import { FollowWrapper } from './Follow.styles';

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

    const {followIndex} = props.location.state;
    const {userName} = props.location.state;
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setValue(followIndex);
    },[followIndex]);
        
    console.log(followIndex);
    console.log(userName);
    return (
        <FollowWrapper>
            <AppBar position="static" className="tabs">
                <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="follows">
                    <Tab label="Followers" {...tabProps(0)} />
                    <Tab label="Following" {...tabProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Followers />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Following />
            </TabPanel>
        </FollowWrapper>
    );
}
export default Follow