import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

export const NavIcon = styled(IconButton)`
    border:1px solid white;
    color:red;
`;
export const TopNavWrapper = styled.div`
    padding:1rem;
    margin:auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 58rem;

    a {
      text-decoration: none;
    }

    .MuiButton-root {
      background: linear-gradient(to right, #fcac56 0%,  #e2336b 100%);  
      transition: 0.5s;
      color: #fff;
      border: none;
      background-size: 125% auto;
      text-decoration: none;
  }

  .MuiButton-root:hover {
      background-position: right center;
      color: #fff;
      text-decoration: none;
      outline: none;
      //background: linear-gradient(to right, #fcac56 0%,  #e2336b 100%); 
  }

  @media only screen and (max-width: 1165px) {
    max-width:625px;
}

@media only screen and (max-width: 845px) {
  max-width:400px;
  flex-direction: column;
  align-items: center;

  .MuiButton-root{
    margin-top: 1rem;
    width: 100%;
  }
}

`;
export const DropdownWrapper = styled.div`
.dropdown {
  background-color:grey;
  border-radius:1rem;
}
`;
export const Ul = styled.ul`
  list-style-type:none;
  padding:0;
`;
export const FWButton = styled(Button)`
  width:100%;
`;
export const FlexBetween = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  p{
    padding:0;
    margin:0;
  }
`;
