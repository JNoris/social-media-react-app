import React from 'react'
import { FlexCenter, InfoWrapper } from './SideNavProfileComponents.styles';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const DisplayInfo = (props) => {

    return (
        <InfoWrapper>
            <FlexCenter>
                <Link to={{
                    pathname: "/profile",
                    state:{ userId: props.userName }
                }}>
                    <Avatar className="avatar" alt="test" src={props.src} />
                </Link>
            </FlexCenter>
            <p>{props.fullname}</p>
            <p>@{props.userName}</p>
        </InfoWrapper>
    );
}
export default DisplayInfo;