import styled from 'styled-components';

export const TopNavWrapper = styled.div`
    height:10vh;
    width:100%;
    p{
        margin:0;
    }
    display:flex;
    justify-content:center;
    align-items:center;   
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top:0;
    z-index:100;
`;