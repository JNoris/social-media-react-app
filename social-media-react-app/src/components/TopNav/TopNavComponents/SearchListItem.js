import React from 'react'
import styled from 'styled-components';

const OuterDiv = styled.div`
    .test:hover{
    background-color:rgba(200,200,200,0.8);
    }
    z-index:100;
`;
const Wrapper = styled.div`
    background-color:white;
    margin:0 2rem;
    padding:0 2vw;
    p{
        font-size:clamp(0.8rem,1vw,1rem);
    }
    display:flex;
    justify-content:space-between;
    img{
        height:3rem;
        width:3rem;
        object-fit:cover;
        border-radius:50%
    }
    
`;

const SearchListItem = (props) => {
    return (
        <OuterDiv>
            <Wrapper className="test" onClick={() => props.setSearch(props.name)}>
                <img src={props.src} alt={props.name} />
                <p>{props.name}</p>
            </Wrapper>
        </OuterDiv>
    );
}
export default SearchListItem;
