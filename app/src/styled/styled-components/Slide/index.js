import React from 'react';
import styled from "styled-components";
import { Transition } from 'react-transition-group';
import { slideInFromLeft, slideOutToLeft, slideInFromRight, slideOutToRight } from "#styles/slide";

const Animation = styled.div`
  ${props => props.slideInFromLeft ? slideInFromLeft : ''}
  ${props => props.slideOutToLeft ? slideOutToLeft : ''}

  ${props => props.slideInFromRight ? slideInFromRight : ''}
  ${props => props.slideOutToRight ? slideOutToRight : ''}
  ${props => props.hide ? 'display: none;' : ''}
`;

const Slide = ({
  direction = 'left',
  children = null,
  hide = false,
}) => (
  <Transition in={!hide} timeout={1000}>
    {transition => (
      <Animation
        hide={transition === 'exited'}
        slideInFromLeft={direction === 'left' && transition === 'entering'}
        slideOutToLeft={direction === 'left' && transition === 'exiting'}
        slideInFromRight={direction === 'right' && transition === 'entering'}
        slideOutToRight={direction === 'right' && transition === 'exiting'}
      >
        {children}
      </Animation>
    )}
  </Transition>
);

export default Slide;
