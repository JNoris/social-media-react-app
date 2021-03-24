import styled from 'styled-components'

export const NavWrapper = styled.div`
    background-color: #282A34;
    width: 20vw;
    height:100%;
    min-height:100vh;
    color:white;
    display:inline-block;
    h1{
        text-align:center;
    }
    @media only screen and (max-width: 900px) {
        width:30vw;
    }
    @media only screen and (max-width: 768px) {
        width:40vw;
    }
`;