export const typeDef = `
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;

export const resolvers = {
  MutationResponse: {
    __resolveType: () => null,
  },
};
