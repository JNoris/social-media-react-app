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
    a{
        text-decoration:none;
        color:white;
    }

`;
export const FlexCenter = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    
    .border-wrap{
        background:linear-gradient(to right, #fcac56 0%,  #e2336b 100%);
        padding:0.2rem;
        border-radius:50%;
    }
    
    .avatar {
        height:10vh;
        width:10vh;
    }
`;
