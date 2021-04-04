import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import FollowingListItem from './FollowingListItem';
import { Wrapper } from '../Follow.styles';
import Empty from '../Empty';

const Following = (props) => {
    const [data, setData] = useState([]);
    const [noFollowing, setNoFollowing] = useState(false);
    useEffect(() => {
        if(Array.isArray(props.data))
        {setData(props.data)}
    },[props.data])
    function checkIfEmpty() {
        if (Array.isArray(data)) {
            if (data.length > 0) {
                setNoFollowing(false);
            }
            else {
                setNoFollowing(true);
            }
        }
    }
    useEffect(() => {
        checkIfEmpty(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    if(noFollowing)
    {
        return <Empty text="Following 0"/>
    }
    return (
        <Container>
            <Wrapper>
                <p className="subheader">{data?.length} Following</p>
                {data?.map(item => (
                    <FollowingListItem
                        key={item.id}
                        isSelf={props.isSelf}
                        src={item.profilePhotoPath}
                        fname={item.firstName}
                        lname={item.lastName}
                        username={item.userName}
                    />
                ))}
            </Wrapper>
        </Container>
    );
}
export default Following