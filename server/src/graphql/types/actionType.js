import { ActionTypes } from '../../constants';

export default `
  enum ActionType {
    ${Object.values(ActionTypes).join('\n\t\t')}
  }
`;
