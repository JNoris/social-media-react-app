import styled from 'styled-components';
export const Wrapper = styled.div`
    margin:auto;
    display:block;
    .submitButton{
        width:100%
    }

    .MuiButton-label{
        padding:0;
    }
    .bottombtn{
        
    }
`;

export const Flex = styled.div`
    display:flex;

    .MuiButton-root {
        background: linear-gradient(to right, #fcac56 0%,  #fcac56 100%);  
        transition: 0.5s;
        color: #fff;
        border: none;
        margin-top: 1.5rem;
        background-size: 125% auto;
    }
    .MuiButton-root:hover {
        // background-position: right center;
        color: #fff;
        text-decoration: none;
        outline: none;
        background: linear-gradient(to right, #fcac56 0%,  #e2336b 100%);  

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
        object-fit:cover;
        
    }
`;
export const CaptionFrame = styled.div`
    width:25vw;
    height:80vh;
    padding:0 1rem;
    background-color:rgba(255,255,255,.1);
    border-radius 0 1rem 0 0;
    .MuiInput-root{
        height:100%;
        width:100%;
        color: #fff;
    }
    overflow-y:scroll;
    ::-webkit-scrollbar {
        display: none;
      }

      .MuiInputBase-inputMultiline::placeholder {
          color: #e4e4e4;
      }
`;

export const UploadButton = styled.div`
.MuiButton-root {
    background: linear-gradient(to right, #fcac56 0%,  #fcac56 100%);  
    //background: none;
    //background-color: #fcac56;
    transition: .5s;
    color: #fff;
    border: none;
    margin-top: .5rem;
    background-size: 125% auto;

    
}
.MuiButton-root:hover {
   // background-position: right center;
    color: #fff;
    text-decoration: none;
    outline: none;
    background: linear-gradient(to right, #fcac56 0%,  #e2336b 100%);  
}

`;
export const NotifWrapper = styled.div`
    position:absolute;
    top:10vh;
`;