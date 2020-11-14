import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { playersState } from '#recoil/selectors';
import { Sides } from '#constants';
import PlayerAvatar from '#components/PlayerAvatar';

const Container = styled.div`
  margin-bottom: 16px;
`;

const PlayerAvatarContainer = ({ side }) => {
  const players = useRecoilValue(playersState) || [];

  return (
    <Container>
      {players.filter(player => player.side === side).map(player => (
        <PlayerAvatar key={player.name} side={player.side} name={player.name} shortName={player.name[0]} />  
      ))}
    </Container>
  );
};

PlayerAvatarContainer.propTypes = {
  side: PropTypes.oneOf(Object.values(Sides)).isRequired,
};



export default PlayerAvatarContainer;
