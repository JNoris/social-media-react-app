import styled from 'styled-components'

export const Media = styled.div`

img {
    border-radius: 15px;
    width: 300px;
    height: 300px;
    object-fit: cover;
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

    p:hover {
        color: #d3d3d3;
    }

    #comments {
        margin-right: 0;
    }

    .icon:hover{
        color: #fcac56;
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