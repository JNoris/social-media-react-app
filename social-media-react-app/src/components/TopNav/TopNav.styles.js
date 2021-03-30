import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

export const NavIcon = styled(IconButton)`
    border:1px solid white;
    color:red;
`;
export const TopNavWrapper = styled.div`
    margin:1rem;
    float:right;
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
