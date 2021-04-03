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
`;
export const TabWrapper = styled.div`
    padding:1rem 2rem;
    h1{
        color:white;
    }
`;

export const Flex = styled.div`
    display:flex;
    padding: 0.5rem 2rem ;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255,255,255,.1);
    margin-bottom: 1rem;
    border-radius: 10px;
    a{
        text-decoration:none;
    }
    button{
        width:20vw;
    }
    p{
        font-weight:bold;
        padding:0;
        margin:0.2rem;
    }
    .user{
        font-size:clamp(11px,1.1vw,1rem);
    }
    .name{
        font-size:clamp(10px,0.9vw,0.8rem);
        color:rgba(255,255,255,.6);
    }
    .center{
        text-align:center;
    }

    .MuiButton-outlined {
        //border: 1px solid rgba(48,53, 64,.7);
        border: 1px solid rgba(255,255, 255,.3);
    }

    .MuiButton-outlined:hover {
        border: 1px solid #e2336b;
    }
`;

export const Wrapper = styled.div`
    p {
        color: #e3e3e3;
    }

    .subheader {
        margin: 2rem 0;
    }

    max-width: 1000px;
    margin: 0 auto;
`;

export const EmptyWrapper = styled.div`
    margin:auto;
    text-align:center;
    h1{
        line-height:50vh;
        color:white;
    }
`;