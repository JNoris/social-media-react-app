import React from 'react'
import Container from '@material-ui/core/Container';
//import {useQuery} from 'react-query';
import {dummyFollow} from '../../temp/dummyData';
import FollowingListItem from './FollowingListItem';
import {Wrapper} from '../Follow.styles';

const Following = (props) => {
    return (
        <Container>
             <Wrapper>
                <p class="subheader">{dummyFollow.length} Following</p>
                    {dummyFollow?.map(item => (
                    <FollowingListItem
                        key={item.id}
                        src={item.src}
                        username={item.username}
                    />
            ))}
            </Wrapper>
        </Container>
    );
}
export default Following