import styled from 'styled-components';

export const FollowWrapper = styled.div`
    .tabs{
        //background-color:#2B2D33;
        background-color:#303540;
        indicatorColor: #fcac56;
    }
    width:100%;
    span{
        color:white;
    }

    .PrivateTabIndicator-colorSecondary-1,
    .PrivateTabIndicator-colorSecondary-3,
    .PrivateTabIndicator-colorSecondary-7,
    .PrivateTabIndicator-colorSecondary-9,
    .PrivateTabIndicator-colorSecondary-11,
    .PrivateTabIndicator-colorSecondary-13,
    .PrivateTabIndicator-colorSecondary-15 {
        background-color: #fcac56
    }

`;

export const Flex = styled.div`
    display:flex;
    padding: 0 2rem ;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    background-color:grey;
    box-shadow: 5px 5px 10px 5px #000000;
    margin-bottom:0.7rem;
    border-radius:1rem;
    button{
        width:20vw;
    }
    p{
        font-weight:bold;
    }
`;


