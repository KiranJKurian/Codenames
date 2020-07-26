import React from 'react';
import { Grid } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Board from '#components/Board';
import TeamSwitch from '#components/TeamSwitch';
import MasterSwitch from '#components/MasterSwitch';
import EndTurnFab from '#components/EndTurnFab';
import ActionSnack from '#components/ActionSnack';
import { playerState, gameState } from '#recoil/selectors';
import { Sides } from '#constants';
import teamColor from '#styles/teamColor';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContainerHiddenWhenNoSide = styled(Container)`
  opacity: ${props => props.side ? 1 : 0};
`;

const TeamHeading = styled.h4`
  ${teamColor}
`;

const GameBoard = () => {
  const {
    turn,
    remainingRed = -1,
    remainingBlue = -1,
  } = useRecoilValue(gameState);

  const { side } = useRecoilValue(playerState);

  // TODO: Add Error and Loading states
  // if (errorTiles) {
  //   console.error(errorTiles);
  //   return <div>Oops, looks like we got an error. Please try again later</div>;
  // }

  // if (loadingTiles) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <ContainerHiddenWhenNoSide side={side}>
              <TeamSwitch />
              <MasterSwitch />
            </ContainerHiddenWhenNoSide>
            <Container>
              <TeamHeading side={Sides.BLUE} dark={turn !== Sides.BLUE}>
                Blue: {remainingBlue} Left
              </TeamHeading>
              <TeamHeading side={Sides.RED} dark={turn !== Sides.RED}>
                Red: {remainingRed} Left
              </TeamHeading>
            </Container>
            <Board />
          </Grid>
        </Grid>
      </Grid>
      <EndTurnFab />
      <ActionSnack />
    </Grid>
  );
};

export default GameBoard;
