import { Sides } from '../../constants';

export default `
  enum Side {
    ${Object.values(Sides).join('\n\t\t')}
  }
`;
