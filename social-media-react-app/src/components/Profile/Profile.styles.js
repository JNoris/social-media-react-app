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
export const ImgFrame = styled.div`
    width:50%;
    margin:auto;
    border-radius:1rem;
    max-height:30vh;
    height:auto;
    overflow:hidden;
    img{
        width:100%;
        height:auto;
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
    padding:3vw 3vw 0 3vw;
    h1{
        font-size:clamp(1rem,3vw,2.5rem);
    }
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
    margin-top:2rem;
    background-color:rgba(40,42,52,0.5);
    border-radius:1rem 1rem 0 0;
    height:30vh;
    overflow-y:scroll;
    padding: 1rem 0;
    display:inline-block;
    color:white;
    ::-webkit-scrollbar {
        display: none;
    }
    .bio-text{
        color:white;
    }

    .MuiInput-underline:before, 
    .MuiInput-underline:after {
        display: none;
    }
    .MuiInput-root{
        padding:1rem;
    }
`;

export const BioML = styled(TextField)`
    width:30vw;
`;
export const ProfileGridWrapper = styled.div`
    
    img{
        width:21vw;
        height:21vw;
        object-fit:cover;
    }
`;

export const LinkWrapper = styled.div`
margin-top: 1rem;
    p {
        color: #e4e4e4;
    }
`;

export const ImgOverlay = styled.div`
    position:relative;
    bottom:0;
    right:0;
    background-color:red;
    height:10px;
    width:10px;
`;