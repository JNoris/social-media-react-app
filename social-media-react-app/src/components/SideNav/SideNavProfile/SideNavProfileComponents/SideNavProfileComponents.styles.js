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
        font-size:0.8rem;
        margin:0;
    }
    @media only screen and (max-width: 900px) {
        p{
            font-size:0.6rem;
        }
    }
    @media only screen and (max-width: 768px) {
        p{
            font-size:0.5rem;
        }
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
