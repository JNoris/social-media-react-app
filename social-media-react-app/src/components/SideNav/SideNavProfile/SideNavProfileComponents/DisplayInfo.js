import React from 'react'
import { FlexCenter, InfoWrapper } from './SideNavProfileComponents.styles';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import test from '../../../temp/test.png';

const DisplayInfo = (props) => {

    var userLink = "/"+props.userName;
    console.log(userLink);
    return (
        <InfoWrapper>
            <FlexCenter>
                <Link to="/profile">
                    <Avatar className="avatar" alt="test" src={test} />
                </Link>
            </FlexCenter>
            <p>{props.fullname}</p>
            <p>@{props.userName}</p>
        </InfoWrapper>
    );
}
export default DisplayInfo;