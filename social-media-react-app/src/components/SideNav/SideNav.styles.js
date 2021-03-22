import styled from 'styled-components'

export const NavWrapper = styled.div`
    background-color: #282A34;
    width: 20vw;
    height:100vh;
    color:white;
    display:inline-block;
    position:absolute;
    @media only screen and (max-width: 900px) {
        width:25vw;
        p{
            font-size:0.8rem;
        }
    }
    @media only screen and (max-width: 768px) {
        width:40vw;
    }
`;