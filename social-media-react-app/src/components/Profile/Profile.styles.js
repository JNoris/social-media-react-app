import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'

export const ProfileWrapper = styled.div`
    display:flex;
`;
export const PostDummy = styled.div`
    height:100%;
    width:40vw;
    background-color:grey;
`;
export const InfoCol = styled.div`
    width:30vw;
    padding:3vw;
    p{
        font-size:1vw;
        font-weight:700;
        color:white;
    }
    button{
        width:100%;
    }
`;
export const Bio = styled.div`
    display:inline-block;
`;
export const BioML = styled(TextField)`
    width:30vw;
`;