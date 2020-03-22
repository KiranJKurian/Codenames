import { TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export default styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: '100%',
}));
