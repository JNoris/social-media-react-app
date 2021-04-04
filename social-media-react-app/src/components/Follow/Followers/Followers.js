//Authors: Edvin Lin
//Styled by: Edvin Lin
import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import FollowersListItem from './FollowersListItem';
import { Wrapper } from '../Follow.styles';
import Empty from '../Empty';

const Followers = (props) => {
    const [data, setData] = useState([]);
    const [noFollow, setNoFollow] = useState(false);
    const [length, setLength] =useState(0);
    useEffect(() => {
        if(Array.isArray(props.data))
        {setData(props.data)}
    },[props.data])

    function checkIfEmpty() {
        if (Array.isArray(data)) {
            if (data.length > 0) {
                setNoFollow(false);
                setLength(data.length);
            }
            else {
                //console.log("no data");
                setNoFollow(true);
            }
        }
    }
    useEffect(() => {
        checkIfEmpty(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    if(noFollow)
    {
        return <Empty text="No Followers"/>
    }
    // if(error)
    // {
    //     return <div>Error</div>
    // }
    return (
        <Container>
            <Wrapper>
                <p className="subheader">{length} Followers</p>
                {data?.map(item => (
                    <FollowersListItem
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
export default Followers