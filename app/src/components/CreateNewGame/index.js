import React from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

const AddIconWithMargin = styled(AddIcon)`
  margin-right: 8px;
`;

const CreateNewGame = () => {
	
	return (
		<Fab size="large" color="secondary" variant="extended" aria-labelledby="createNewGame">
			<AddIconWithMargin />
			<span id="createNewGame">New Game</span>
		</Fab>
	);
};

export default CreateNewGame;
