import styled from 'styled-components'

export const CaptionWrapper = styled.div`
    p {
        margin-top: -15px;
        padding: 0 5px;
    }
`;

export const FormWrapper = styled.div`
.MuiFilledInput-input {
    padding: 10px;
    color: #fff;
    background-color: rgba(255,255,255,.2);
    border-radius: 5px;
}

.MuiFilledInput-input::placeholder {
    color: #e4e4e4;
}

.MuiFilledInput-multiline {
    padding: 0;
}

.MuiFilledInput-underline:after {
    border-bottom: 2px solid #fcac56;
}

`;

export const ButtonWrapper = styled.div`
.MuiButton-root {
    background: linear-gradient(to right, #fcac56 0%,  #fcac56 100%);  
    transition: 0.5s;
    background-size: 125% auto;
    color: #fff;
    border: none;
    margin-top: .5rem;
    width: 100%;
}

.MuiButton-root:hover {
    //background-position: right center;
    color: #fff;
    text-decoration: none;
    outline: none;
    background: linear-gradient(to right, #fcac56 0%,  #e2336b 100%);  
}
`;
