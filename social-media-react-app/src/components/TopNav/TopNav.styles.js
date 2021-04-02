import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

export const NavIcon = styled(IconButton)`
    border:1px solid white;
    color:red;
`;
export const TopNavWrapper = styled.div`
    padding:1rem 1rem 2rem;
    margin: 1rem auto;
    // float:right;
    // display: block;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;

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
