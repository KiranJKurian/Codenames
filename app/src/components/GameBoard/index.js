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
import PlayerAvatarContainer from '#components/PlayerAvatarContainer';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  text-align: ${props => props.side === Sides.BLUE ? 'start' : 'end'};
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
    masterBlue,
    masterRed,
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
              <TeamContainer side={Sides.BLUE}>
                <TeamHeading side={Sides.BLUE} dark={turn !== Sides.BLUE}>
                  Spymaster: {masterBlue || 'None'}
                  <br />
                  {remainingBlue} Left
                </TeamHeading>
                <PlayerAvatarContainer side={Sides.BLUE} />
              </TeamContainer>
              <TeamContainer side={Sides.RED}>
                <TeamHeading side={Sides.RED} dark={turn !== Sides.RED}>
                  Spymaster: {masterRed || 'None'}
                  <br />
                  {remainingRed} Left
                </TeamHeading>
                <PlayerAvatarContainer side={Sides.RED} />
              </TeamContainer>
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
