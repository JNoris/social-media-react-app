import React from 'react'
import Container from '@material-ui/core/Container';
//import {useQuery} from 'react-query';
import {dummyFollow} from '../../temp/dummyData';
import FollowersListItem from './FollowersListItem';
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
            <p>{dummyFollow.length} Followers</p>
            {dummyFollow?.map(item => (
                <FollowersListItem
                key={item.id}
                src={item.src}
                username={item.username}
                />
            ))}
        </Container>
    );
}
export default Followers