import styled from 'styled-components';

export const InfoWrapper = styled.div`
    padding-top:2rem;
    width:80%;
    margin:auto;
    p{
        text-align:center;
    }
    a{
        text-decoration:none;
        color:white;
    }
`;

export const Center = styled.div`
    text-align: center;
    p{
        font-size: clamp(0.6rem,1vw,0.8rem);
        margin:0;
    }

`;
export const FlexCenter = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    
    
    .avatar {
        height:10vh;
        width:10vh;
        border: 0.15rem solid black;
    }
`;
