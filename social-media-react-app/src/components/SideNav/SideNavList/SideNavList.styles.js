import styled from 'styled-components';

export const ListWrapper = styled.div`
    .selected {
        color:red;
        font-weight:bold;
    }
    ul{
        list-style-type:none;
        padding:0;
    }
    ul li:last-child {
        border-top:1px solid white;
    }
    a{
        color:white;
        text-decoration:none;
    }
`;

export const Li = styled.li`
    svg{
        margin-right:3vw;
    }
    .sidenav-link {
        padding-left:1.5vw;
        display:flex;
        align-items:center;
        height:5vh;;
    }
    
    .sidenav-link:hover {
        background-color: #3C3F51;
    }
    div{
        fontsize:2vw;
    }
`;