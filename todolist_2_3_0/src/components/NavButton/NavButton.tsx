import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

type Props = {
  background: string
}

export const NavButton = styled(Button)<Props>(({background}) => ({
  minWidth: '110px',
  fontWeight: 'bold',
  boxShadow: '0 0 0 2px #054b62, 4px 4px 0 0  #054b62',
  borderRadius: '2px',
  textTransform: '2px',
  margin: '0 10px',
  padding: '8px 24px',
  color: '#fff',
  background: background || '#1265c0',
}));
