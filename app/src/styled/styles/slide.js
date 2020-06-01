import { css, keyframes } from "styled-components";

export const slideInFromLeftKeyFrames = keyframes`
  from {
    transform: translateX(-100vw);
    opacity: 0;
    position: absolute;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideInFromLeft = css`
  animation: ${slideInFromLeftKeyFrames} 1s;
`;

export const slideInFromRightKeyFrames = keyframes`
  from {
    transform: translateX(100vw);
    opacity: 0;
    position: absolute;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideInFromRight = css`
  animation: ${slideInFromRightKeyFrames} 1s;
`;

export const slideOutToLeftKeyFrames = keyframes`
  to {
    transform: translateX(-100vw);
    opacity: 0;
    position: absolute;
  }

  from {
    transform: translateX(0);
    opacity: 1;
    position: unset;
  }
`;

export const slideOutToLeft = css`
  animation: ${slideOutToLeftKeyFrames} 1s;
  opacity: 0;
  position: absolute;
`;

export const slideOutToRightKeyFrames = keyframes`
  to {
    transform: translateX(100vw);
    opacity: 0;
    position: absolute;
  }

  from {
    transform: translateX(0);
    opacity: 1;
    position: unset;
  }
`;

export const slideOutToRight = css`
  animation: ${slideOutToRightKeyFrames} 1s;
  opacity: 0;
  position: absolute;
`;
