import styled from 'styled-components'

export const CardWrapper = styled.div`
    max-width: 500px;
    // for testing on home page
    // margin-left: 20rem;
`;

export const Media = styled.div`
    // tbd
`;

export const ContentWrapper = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    margin: 0 auto;
`;

export const ContentComponent = styled.div `
    display: flex;
    align-items: center;

    p {
        padding-left: 0.5rem;
        margin-right: 1rem;
    }

    .MuiCardActions-root {
        display: flex;
        padding: 8px;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }
`;

export const PostActions = styled.div `
    display: flex;
    align-items: center;
    margin: 0 1rem;
`;
