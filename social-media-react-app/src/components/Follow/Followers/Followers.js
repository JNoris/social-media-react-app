import React from 'react'
import Container from '@material-ui/core/Container';
//import {useQuery} from 'react-query';
import {dummyFollow} from '../../temp/dummyData';
import FollowersListItem from './FollowersListItem';
import {Wrapper} from '../Follow.styles';

const Followers = (props) => {
    //API call using props.id or something
    // const getFollowers = async() => await(fetch('',{
    //     method:"GET",
    //     headers:`Token ${token}`
    // }))
    // const {data,isLoading,error}=useQuery(
    //     'followers',
    //     getFollowers
    // );
    return (
        <Container>
            <Wrapper>
                <p class="subheader">{dummyFollow.length} Followers</p>
                {dummyFollow?.map(item => (
                    <FollowersListItem
                        key={item.id}
                        src={item.src}
                        username={item.username}
                    />
                ))}
            </Wrapper>
        </Container>
    );
}
export default Followers