import React from 'react'
import { Li, ListWrapper } from './SideNavList.styles';
import SideNavListItem from './SideNavListItem';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Link } from 'react-router-dom';

const SideNavList = (props) => {
    function logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload();
    }
    return (
        <ListWrapper>
            <ul>
                <SideNavListItem
                    route="/"
                    icon={<CameraRollIcon />}
                    description="Feed"
                />
                <Li>
                    <Link to={{
                        pathname: "/follow",
                        state: {
                            followIndex: 0,
                            userName: props.userName
                        }
                    }}>
                        <div className="sidenav-link">
                            <GroupIcon /> Followers
                    </div>
                    </Link>
                </Li>
                <Li>
                    <Link to={{
                        pathname: "/follow",
                        state: {
                            followIndex: 1,
                            userName: props.userName
                        }
                    }}>
                        <div className="sidenav-link">
                            <FavoriteIcon /> Following
                    </div>
                    </Link>
                </Li>
                <SideNavListItem
                    route="/add"
                    icon={<AddAPhotoIcon />}
                    description="New Post"
                />
                <SideNavListItem
                    route="/explore"
                    icon={<SearchIcon />}
                    description="Explore"
                />
                <SideNavListItem
                    route="/chat"
                    icon={<ChatIcon />}
                    description="Direct"
                />
                
                <SideNavListItem
                    route="/settings"
                    icon={<SettingsIcon />}
                    description="Settings"
                />
                <Li onClick={() => logOut()}>
                    <Link to='/'>
                        <div className="sidenav-link">
                            <ExitToAppIcon /> Logout
                    </div>
                    </Link>
                </Li>
            </ul>
        </ListWrapper>
    );
}
export default SideNavList