import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import styled from 'styled-components';
import StretchedTextField from '#sc/StretchedTextField';
import StretchedButton from '#sc/StretchedButton';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const JoinGameForm = ({
  onSubmit,
  error,
  onChange,
  value,
  helperText,
}) => (
  <Card>
    <CardHeader title="Join Game" />
    <CardContent>
      <form
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormContainer>
          <StretchedTextField
            error={error}
            onChange={onChange}
            value={value}
            id="room-code"
            label="Room code"
            variant="outlined"
            helperText={helperText}
            required
          />
          <StretchedButton color="primary" type="submit" variant="contained">
            Submit
          </StretchedButton>
        </FormContainer>
      </form>
    </CardContent>
  </Card>
);

JoinGameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  helperText: PropTypes.string,
};

JoinGameForm.defaultProps = {
  error: false,
  value: '',
  helperText: '',
};

export default JoinGameForm;
