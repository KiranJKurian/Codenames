export const typeDef = `

  type Action {
    id: ID!
    type: ActionType!
    playerName: String
    playerSide: Side
    gameId: String
    word: String
  }
`;

export const resolvers = {
  Action: {
    id: ({ _id: id }) => id,
  },
};
