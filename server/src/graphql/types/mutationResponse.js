const typeDef = `
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;

const resolvers = {
  MutationResponse: {
    __resolveType: () => null,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
