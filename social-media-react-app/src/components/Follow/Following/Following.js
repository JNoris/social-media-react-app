import React from 'react'
import Container from '@material-ui/core/Container';
//import {useQuery} from 'react-query';
import {dummyFollow} from '../../temp/dummyData';
import FollowingListItem from './FollowingListItem';

const Following = (props) => {
    return (
        <Container>
            <p>{dummyFollow.length} Following</p>
            {dummyFollow?.map(item => (
                <FollowingListItem
                key={item.id}
                src={item.src}
                username={item.username}
                />
            ))}
        </Container>
    );
}
export default Following