import React from 'react'
import { ProfileGridWrapper } from './Profile.styles'

const ProfileGridItem = (props) => {
    return (
        <ProfileGridWrapper>
            <img src={props.src} alt={props.alt} />
        </ProfileGridWrapper>
    );
}
export default ProfileGridItem