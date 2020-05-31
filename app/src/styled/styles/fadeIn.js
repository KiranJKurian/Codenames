import { css, keyframes } from "styled-components";

export const fadeInKeyFrames = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export default css`
  animation: ${fadeInKeyFrames} 2s;
`;