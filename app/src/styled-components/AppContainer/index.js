import { styled } from '@material-ui/core/styles';

export default styled('div')(({ theme }) => ({
  backgroundColor: '#282c34',
  color: 'white',
  fontSize: '1em',
  flexGrow: 1,
  minHeight: '100vh',
  padding: theme.spacing(2),
  textAlign: 'center',
}));
