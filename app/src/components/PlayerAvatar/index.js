import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
import { Sides } from '#constants';

const AvatarFab = styled(Fab)`
  ${props => props.side === Sides.BLUE
    ? 'margin-right: 8px;'
    : 'margin-left: 8px;'}
  margin-top: 4px;
  margin-bottom: 4px;
`;

const PlayerAvatar = ({ name, side, shortName }) => {
  const color = side === Sides.BLUE ? 'primary' : 'secondary';

  return (
    <Tooltip enterTouchDelay={50} title={name} aria-label="name">
      <AvatarFab side={side} size="small" color={color}>
        {shortName}
      </AvatarFab>
    </Tooltip>
  );
};

PlayerAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  side: PropTypes.oneOf(Object.values(Sides)).isRequired,
  shortName: PropTypes.string.isRequired,
};

export default PlayerAvatar;
