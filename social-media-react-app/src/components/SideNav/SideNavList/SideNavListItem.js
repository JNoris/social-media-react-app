import React from 'react'
import { NavLink } from 'react-router-dom';
import { Li } from './SideNavList.styles';

const SideNavListItem = (props) => {
    return(
        <Li>
            <NavLink exact={true} to={props.route} activeClassName="selected">
            <div className="sidenav-link">
                {props.icon} {props.description}
            </div>
            </NavLink>
        </Li>
    );
}
export default SideNavListItem