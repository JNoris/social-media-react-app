import Input from '@material-ui/core/Input';
import styled from 'styled-components';

export const SearchWrapper = styled.div`
    display:flex;
    background-color:rgba(255,255,255,.1);
    width:fit-content;
    border-radius: 5px;
    color:red;
    input:focus{
        outline:none;
    }
    input{
        padding:0;
    }
    .MuiInputBase-root{
        height:auto;
        color: #fff;
    }
    .MuiInput-Input{
        color:#fff;
    }
    .searchinput{
        font-size:0.9rem;
    }
`;
export const Search = styled(Input)`
    // border:1px solid black;
    // border-radius: 2rem 0 0 2rem;
    padding: 0 1rem;
    width:25vw;
    margin:0;
    font-size: clamp(5px,0.75vh,1rem);
`;
export const BtnWrap = styled.div`
    // border-color:black;
    // border-style:solid;
    // border-width:1px 1px 1px 0;
    // border-radius: 0 2rem 2rem 0; 
    height:auto;
    display:flex;
    padding:0 0.5rem;
    align-items:center;
    .MuiButtonBase-root{
        padding:0.5rem;
        color: #fff;
    }
`;