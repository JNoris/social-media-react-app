import React from 'react'
import {Li, ListWrapper} from './SideNavList.styles';
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
    function logOut() {
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <ListWrapper>
            <ul>
                <SideNavListItem 
                    route="/"
                    icon={<FireplaceIcon />}
                    description="Feed"
                />
                <SideNavListItem 
                    route="/g"
                    icon={<SearchIcon/>}
                    description="Explore"
                />
                <SideNavListItem 
                    route="/notifications"
                    icon={<NotificationsIcon/>}
                    description="Notifications"
                    
                />
                <SideNavListItem 
                    route="/chat"
                    icon={<ChatIcon/>}
                    description="Direct"
                />
                <SideNavListItem 
                    route="/TEST"
                    icon={<LiveTvIcon/>}
                    description="FGTV"
                />
                <SideNavListItem 
                    route="/c"
                    icon={<ShowChartIcon/>}
                    description="Stats"
                />
                <SideNavListItem 
                    route="/settings"
                    icon={<SettingsIcon/>}
                    description="Settings"
                />
                <Li onClick={() => logOut()}>
                    <div className="sidenav-link">
                        <ExitToAppIcon/> Logout
                    </div>
                </Li>
            </ul>
        </ListWrapper>
    );
}
export default SideNavList