import styled from 'styled-components'

export const Media = styled.div`
    img {
        border-radius: 20px;
        height: auto;
        max-width: 300px; // update with max width of card container
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

    #comments {
        margin-right: 0;
    }

    .icon:hover{
        color: #d3d3d3;
    }
`;

export const PostActions = styled.div `
    display: flex;
    align-items: center;
    margin: 0 0.4rem;
`;