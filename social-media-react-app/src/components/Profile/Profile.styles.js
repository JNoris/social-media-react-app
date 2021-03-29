import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'

export const ProfileWrapper = styled.div`
    display:flex;
    .MuiGrid-root {
        padding:0;
    }

    h1 {
        color: #f9f9f9;
    }
`;
export const PostDummy = styled.div`
    height:100vh;
    width:44vw;
    background-color:rgba(40,42,52,0.5);
    overflow-x:auto;
    overflow-y:scroll;
    ::-webkit-scrollbar {
        width: 0;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }  
    img {
        border-radius: 15px;
        border: none;
    }
`;
export const GridWrapper = styled.div`
    padding:0.5vw;
    width:97.5%
`;
export const InfoCol = styled.div`
    width:30vw;
    padding:3vw;
    p{
        font-size:1vw;
        font-weight:700;
        color:white;
    }
    .edit{
        width:100%;
    }
`;
export const FlexEven = styled.div`
    display:flex;
    justify-content:space-evenly;
    button{
        width:100%;
        margin: 0 .5rem;
        background: linear-gradient(to right, #fcac56 0%,  #fcac56 100%);  
        //background: none;
        //background-color: #fcac56;
        transition: .5s;
        color: #fff;
        border: none;
        margin-top: .5rem;
        background-size: 125% auto;
    }

    button:hover {
        //background-position: right center;
        color: #fff;
        text-decoration: none;
        outline: none;
        background: linear-gradient(to right, #fcac56 0%,  #e2336b 100%);  
    }
`;
export const Bio = styled.div`
    //padding-top:2rem;
    padding: 1rem 0;
    display:inline-block;
    color:white;
    .bio-text{
        color:white;
    }

    .MuiInput-underline:before, 
    .MuiInput-underline:after {
        display: none;
    }
`;

export const BioML = styled(TextField)`
    width:30vw;
`;
export const ProfileGridWrapper = styled.div`
    width:100%;
    margin:auto;
    img{
        height:auto;
        width:100%
    }
`;

export const LinkWrapper = styled.div`
margin-top: 1rem;
    p {
        color: #e4e4e4;
    }
`;
