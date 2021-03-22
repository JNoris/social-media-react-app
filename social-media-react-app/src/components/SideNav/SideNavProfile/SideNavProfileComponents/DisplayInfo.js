import React from 'react'
import { FlexCenter, InfoWrapper } from './SideNavProfileComponents.styles';
import Avatar from '@material-ui/core/Avatar';
import test from '../../../temp/test.png';

const DisplayInfo = () => {
    return(
        <InfoWrapper>
            <FlexCenter>
                <Avatar alt="test" src={test}/>
            </FlexCenter>
            <p>
                sdsaf
            </p>
        </InfoWrapper>
    );
}
export default DisplayInfo;