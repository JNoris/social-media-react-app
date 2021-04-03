import styled from 'styled-components';
export const Wrapper = styled.div`
    font-family:'Roboto';
    h1{
        color:white;
    }
    .settingheader{
        h3{color: #e4e4e4; font-weight: normal}
    }   
    .MuiInput-root{
        width:100%;
        background-color:white;
        border-radius:0.3rem;
        padding: 0 1rem;
    }
    ul{
        list-style-type:none;
        margin:0;
    }
    h6{
        font-size:1rem;
        margin:0;
        color: #e4e4e4;
    }
    .group{
        //border:1px solid white;
        border-radius:0.3rem;
        padding:1rem 1.5rem;
        margin:0.5rem 0;
        background-color: rgba(255,255,255,.1);
        color: #f9f9f9;
    }

    .MuiButton-root {
        display: none;
        background: linear-gradient(to right, #fcac56 0%,  #fcac56 100%);  
        transition: 0.5s;
        color: #fff;
        border: none;
        background-size: 125% auto;
    }
    .MuiButton-root:hover {
        color: #fff;
        text-decoration: none;
        outline: none;
        background: linear-gradient(to right, #fcac56 0%,  #e2336b 100%); 
    }

    .search {
        background-color: rgba(255,255,255,.2);
        color: #fff;
    }

    .search::placeholder{
        color: #e4e4e4;
    }


`;
