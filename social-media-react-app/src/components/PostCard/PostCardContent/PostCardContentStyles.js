import styled from 'styled-components'

export const ContentWrapper = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin: 0 auto;
    background-color: transparent;

    .MuiCardContent-root {
        width: 100%;
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
        margin-right: 1rem;
    }
`;

export const PostActions = styled.div `
    display: flex;
    align-items: center;
    margin: 0 1rem;
`;