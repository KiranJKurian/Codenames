const freshBoard = require('./datasources/board.json');

const games = {};
const tiles = {};
const teams = {};
const players = {};

const Sides = Object.freeze({ RED: 'RED', BLUE: 'BLUE', YELLOW: 'YELLOW' });

class Board {
    constructor(board) {
        this.board = board;
        this.tiles = freshBoard.map((tile) => ({
            ...tile,
            // Update sides
            side: Sides.RED,
            picked: false,
        }));
    }
}
const boardReducer = boardObject => ({
    board: boardObject.board,
    tiles: boardObject.tiles,
});

class Player {
    constructor(player, team = null) {
        this.player = player;
        this.team = team;
    }
}
const playerReducer = playerObject => playerObject && {
    player: playerObject.player,
    team: playerObject.team,
};

class Team {
    constructor(team, side) {
        this.team = team;
        this.players = [];
        this.master = null;
        this.score = 0;
        this.side = side;
    }
}
const teamReducer = teamObject => ({
    team: teamObject.team,
    players: teamObject.players.map(playerReducer),
    master: playerReducer(teamObject.master),
    score: teamObject.score,
    side: teamObject.side,
});

class Game {
    constructor(game) {
        this.game = game;
        this.board = new Board(game);
        // Possibly add team names?
        this.teams = [new Team(`${game}-${Sides.RED}`, Sides.RED), new Team(`${game}-${Sides.BLUE}`, Sides.BLUE)];
        this.turn = Sides.RED;
        this.winner = null;
    }
}
const gameReducer = gameObject => ({
    game: gameObject.game,
    board: boardReducer(gameObject.board),
    teams: gameObject.teams.map(teamReducer),
    turn: gameObject.turn,
    winner: gameObject.winner,
});

module.exports = {
    Query: {
        game: (_, { game }) => {
            if (!(game in games)) {
                games[game] = new Game(game);

                // Adding tiles to Tile cache
                for (const tile of games[game].board.tiles) {
                    tiles[tile.tile] = tile;
                }

                // Adding teams to Team cache
                for (const team of games[game].teams) {
                    teams[team.team] = team;
                }
            }
            console.log({ games, tiles });
            return gameReducer(games[game]);
        },
        tile: (_, { tile }) => tiles[tile] || null,
        team: (_, { team }) => teams[team] || null,
    },
    Mutation: {
        player: (_, { player, team }) => {
            if (player in players) {
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Player already exists.'
                };
            }

            if (!(team in teams)) {
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Team does not exist.'
                };
            }

            players[player] = new Player(player, team);
            if (teams[team].players.length === 0) {
                teams[team].master = players[player]
            }
            teams[team].players.push(players[player]);
            console.log('Added player', players[player]);

            return {
                success: true,
                status: 200,
                error: 'Player successfully created.'
            };
        },
    },
  };
