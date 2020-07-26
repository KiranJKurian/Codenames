import { css } from "styled-components";
import { Sides } from '#constants';

export default css`
  color: ${({ side, dark, theme }) => {
    const {
      palette: {
        primary: {
          main: primary,
          dark: primaryDark,
        },
        secondary: {
          main: secondary,
          dark: secondaryDark,
        },
      },
    } = theme;
    
    if (side === Sides.BLUE) {
      return dark ? primaryDark : primary;
    }
    if (side === Sides.RED) {
      return dark ? secondaryDark : secondary;
    }

    return null;
  }}
`;