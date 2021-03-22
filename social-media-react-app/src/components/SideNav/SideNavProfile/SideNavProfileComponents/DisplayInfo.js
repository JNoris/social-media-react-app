import React from 'react'
import { FlexCenter, InfoWrapper } from './SideNavProfileComponents.styles';
import Avatar from '@material-ui/core/Avatar';
import test from '../../../temp/test.png';

const DisplayInfo = (props) => {
    return (
        <InfoWrapper>
            <FlexCenter>
                <Avatar className="avatar" alt="test" src={test} />
            </FlexCenter>
            <p>{props.fullname}</p>
            <p>@{props.userName}</p>
        </InfoWrapper>
    );
}
export default DisplayInfo;