import React from 'react'
import {ListWrapper} from './SideNavList.styles';
import SideNavListItem from './SideNavListItem';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const SideNavList = () => {
    return (
        <ListWrapper>
            <ul>
                <SideNavListItem 
                    icon={<FireplaceIcon />}
                    description="Feed"
                />
                <SideNavListItem 
                    icon={<SearchIcon/>}
                    description="Explore"
                />
                <SideNavListItem 
                    icon={<NotificationsIcon/>}
                    description="Notifications"
                    
                />
                <SideNavListItem 
                    icon={<ChatIcon/>}
                    description="Direct"
                />
                <SideNavListItem 
                    icon={<LiveTvIcon/>}
                    description="FGTV"
                />
                <SideNavListItem 
                    icon={<ShowChartIcon/>}
                    description="Stats"
                />
                <SideNavListItem 
                    icon={<SettingsIcon/>}
                    description="Settings"
                />
                <SideNavListItem 
                    icon={<ExitToAppIcon/>}
                    description="Logout"
                />
            </ul>
        </ListWrapper>
    );
}
export default SideNavList