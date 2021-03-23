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
        margin-right:3rem;
    }
    .sidenav-link {
        padding-left:2rem;
        display:flex;
        align-items:center;
        height:3rem;
    }
    
    .sidenav-link:hover {
        background-color: #3C3F51;
    }
    @media only screen and (max-width: 900px) {
        svg{
            margin-right:2rem;
        }
        div{
            font-size:1rem;
        }
    }
    @media only screen and (max-width: 768px) {
        svg{
            margin-right:1rem;
        }
        div{
            font-size:0.75rem;
        }
    }
`;