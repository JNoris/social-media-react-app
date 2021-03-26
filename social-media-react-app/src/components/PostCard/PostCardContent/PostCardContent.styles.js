import styled from 'styled-components'

export const Media = styled.div`
    img {
        border-radius: 20px;
        height: auto;
        max-width: 300px; // update with max width of card container
    }

    img:hover {
        opacity: .7;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin: 0 auto;
    background: transparent;

    .MuiCardContent-root {
        width: 100%;
        padding: 7px 0;
    }

    .MuiCardActions-root {
        display: flex;
        padding: 5px;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }
`;

export const ContentComponent = styled.div `
    display: flex;
    align-items: center;

    p {
        padding-left: 0.5rem;
        margin-right: .5rem;
    }

<<<<<<< HEAD
    p:hover {
        color: #d3d3d3;
    }

=======
>>>>>>> 3c8b657ca53800756c11f43bc467d200dfcc97b2
    #comments {
        margin-right: 0;
    }

    .icon:hover{
<<<<<<< HEAD
        color: #fcac56;
=======
        color: #d3d3d3;
>>>>>>> 3c8b657ca53800756c11f43bc467d200dfcc97b2
    }
`;

export const PostActions = styled.div `
    display: flex;
    align-items: center;
    margin: 0 0.4rem;
`;


export const LinkWrapper = styled.div `
    a {
        text-decoration:none;
        color:white;
        display: flex;
        align-items: center;
    }
    
    a:hover {
        color:#d3d3d3;
    }

`;