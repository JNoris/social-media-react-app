import React from 'react'
import { Li } from './SideNavList.styles';

const SideNavListItem = (props) => {
    return(
        <Li>
            <div className="sidenav-link">
                {props.icon} {props.description}
            </div>
        </Li>
    );
}
export default SideNavListItem