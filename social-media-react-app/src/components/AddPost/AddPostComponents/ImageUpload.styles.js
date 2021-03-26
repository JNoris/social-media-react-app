import styled from 'styled-components';
export const Wrapper = styled.div`
    margin:auto;
    display:block;
    .submitButton{
        width:100%
    }
    .MuiButton-root{
        background-color:white;
    }
    .MuiButton-label{
        padding:0;
    }
    .bottombtn{
        
    }
`;

export const Flex = styled.div`
    display:flex;
`;
export const PostFrame = styled.div`
    background-color:rgba(39,43,52,0.9);
    padding:2rem;
    width:50vw;
    max-height: 75vh;
    border-radius:1rem 0 0 0;
`;
export const ImageFrame = styled.div`
    border:1px solid black;
    height:95%;
    margin:auto;
    background-color:rgba(255,255,255,.1);
    overflow:hidden;
    img {
        margin:auto;
        display:block;
        height:100%;
        
    }
`;
export const CaptionFrame = styled.div`
    width:25vw;
    height:80vh;
    padding:1rem;
    background-color:rgba(255,255,255,.1);
    border-radius 0 1rem 0 0;
    .MuiInput-root{
        height:100%;
        width:100%;
    }
    overflow-y:scroll;
    ::-webkit-scrollbar {
        display: none;
      }
`;