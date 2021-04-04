//Authors: Edvin Lin
//Styled by: Edvin Lin
import React from 'react'
import { FlexCenter, InfoWrapper } from './SideNavProfileComponents.styles';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const DisplayInfo = (props) => {

    return (
        <InfoWrapper>
            <Link to={{
                pathname: "/profile",
                state: { userId: props.userName }
            }}>
                <FlexCenter>
                    <div className="border-wrap">
                    <Avatar className="avatar" alt={props.userName} src={props.src} />
                    </div>
                </FlexCenter>
                <p>{props.fullname}</p>
                <p>@{props.userName}</p>
            </Link>
        </InfoWrapper>
    );
}
export default DisplayInfo;