import React from 'react'
import { Link } from 'react-router-dom';
import { ProfileGridWrapper } from './Profile.styles'

const ProfileGridItem = (props) => {
    var link = "/"+props.link;
    return (
        <ProfileGridWrapper>
            <Link to={link}>
                <img src={props.src} alt={props.alt} />
            </Link>
        </ProfileGridWrapper>
    );
}
export default ProfileGridItem