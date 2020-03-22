const { gql } = require('apollo-server');

const typeDefs = gql`
    enum Side {
        RED
        BLUE
        YELLOW
    }
    type Query {
        game(game: ID!): Game!
        # board(board: ID!): Board
        tile(tile: ID!): Tile
        team(team: ID!): Team
        picked(board: ID!): [Tile]
    }
    type Mutation {
        player(player: ID!, team: ID!): PlayerResponse!
        pick(tile: ID!, player: ID!): PickResponse!
    }
    type Game {
        game: ID!
        board: Board!
        teams: [Team]!
        turn: Side
        winner: Team
    }
    type Board {
        board: ID!
        game: ID!
        tiles: [Tile]!
    }
    type Team {
        team: ID!
        players: [Player]!
        master: Player
        score: Int
        side: Side!
    }
    type Tile {
        tile: ID!
        board: ID!
        word: String!
        side: Side!
        picked: Boolean!
    }
    type Player {
        player: ID!
        team: ID
    }
    type PlayerResponse {
        success: Boolean!
        status: String
        error: String
    }
    type PickResponse {
        success: Boolean!
        status: String
        error: String
    }
`;

module.exports = typeDefs;