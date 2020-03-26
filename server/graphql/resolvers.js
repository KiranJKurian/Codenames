const freshBoard = require('./datasources/board.json');

const games = {};
const boards = {};
const tiles = {};
const teams = {};
const players = {};

const Sides = Object.freeze({ RED: 'RED', BLUE: 'BLUE', YELLOW: 'YELLOW' });

class Board {
    constructor(board, game) {
        this.board = board;
        this.game = game;
        this.tiles = freshBoard.map((tile) => ({
            ...tile,
            tile: `${tile.tile}-${Math.random()}`,
            board,
            // Update sides
            side: Math.random() >= 0.5 ? Sides.RED : Sides.BLUE,
            picked: false,
        }));
    }
}
const boardReducer = boardObject => ({
    board: boardObject.board,
    game: boardObject.game,
    tiles: boardObject.tiles,
});

class Player {
    constructor(player, team = null) {
        this.player = player;
        this.teams = team ? [team] : [];
    }
}
const playerReducer = playerObject => playerObject && {
    player: playerObject.player,
    teams: playerObject.teams,
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
const teamReducer = teamObject => teamObject && ({
    team: teamObject.team,
    players: teamObject.players.map(playerReducer),
    master: playerReducer(teamObject.master),
    score: teamObject.score,
    side: teamObject.side,
});

class Game {
    constructor(game) {
        this.game = game;
        this.board = new Board(game, game);
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
    winner: teamReducer(gameObject.winner),
});

module.exports = {
    Query: {
        game: (_, { game }) => game in games ? gameReducer(games[game]) : null,
        tile: (_, { tile }) => tiles[tile] || null,
        team: (_, { team }) => teams[team] || null,
        picked: (_, { board }) => {
            if (!(board in boards)) {
                return null;
            }

            return boards[board].tiles.filter(({ picked }) => picked);
        }
    },
    Mutation: {
        game: (_, { game }) => {
            if (!(game in games)) {
                games[game] = new Game(game);

                boards[games[game].board.board] = games[game].board;

                // Adding tiles to Tile cache
                for (const tile of games[game].board.tiles) {
                    tiles[tile.tile] = tile;
                }

                // Adding teams to Team cache
                for (const team of games[game].teams) {
                    teams[team.team] = team;
                }

                console.info(`Created game: ${game}`);
            }
            
            return {
                success: true,
                status: 200,
            };
        },
        player: (_, {
            player: playerId,
            team: teamId,
            game: gameId,
        }) => {
            let player = players[playerId];
            const team = teams[teamId];
            const game = games[gameId];

            if (!game) {
                console.warn(`Game ${gameId} does not exist.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Game does not exist.',
                };
            }
            if (!team) {
                console.warn(`Team ${teamId} does not exist.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Team does not exist.',
                };
            }
            if (!game.teams.some(({ team: teamName }) => teamName === teamId)) {
                console.warn(`Team ${teamId} does not exist in game ${gameId}.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Team does not exist in game.',
                };
            }

            if (!player) {
                player = new Player(playerId, teamId);
                players[playerId] = player;
            } else if (!player.teams.includes(teamId)) {
                // If player is on a different team in this game, switch them
                const { team: teamToSwitchId } = game.teams
                    .find(({ players }) => 
                        players.some(({ player: playerName }) => playerName === playerId
                    )) || {};
                const teamToSwitch = teams[teamToSwitchId];

                if (teamToSwitch) {
                    console.info(`Player ${playerId} leaving team ${teamToSwitchId}.`);
                    // Remove old team from player's teams
                    const playerTeamIndex = player.teams.findIndex(({ team: playerTeam }) => playerTeam === teamToSwitchId);
                    player.teams.splice(playerTeamIndex, 1);
                    // Remove player from old team's players
                    const playerToDeleteIndex = teamToSwitch.players.findIndex(({ player: playerToDelete }) => playerToDelete === playerId);
                    teamToSwitch.players.splice(playerToDeleteIndex, 1);
                    // If old team is now empty, set master to null
                    if (teamToSwitch.players.length === 0) {
                        teamToSwitch.master = null;
                        console.info(`Team ${teamToSwitchId} is now empty.`);
                    } else if (teamToSwitch.master.player === playerId) {
                        // Old team is not empty but player was master, assign new master
                        teamToSwitch.master = teamToSwitch.players[0];
                        console.info(`Player ${teamToSwitch.players[0].player} promoted to master of team ${teamToSwitchId}.`);
                    }
                }

                // Add team to player's teams
                player.teams.push(teamId);
            } else {
                // Player is already on the team
                console.info(`Player: ${playerId} is already on team: ${teamId}.`);
                return {
                    success: true,
                    status: 200,
                };
            }

            if (team.players.length === 0) {
                team.master = player;
            }
            team.players.push(player);
            console.info(`Added player: ${playerId} to team ${teamId}.`);

            return {
                success: true,
                status: 200,
            };
        },
        pick: (_, {
            tile: tileId,
            player: playerId,
            game: gameId,
        }) => {
            const tile = tiles[tileId];
            const player = players[playerId];
            const game = games[gameId];

            if (!game) {
                console.warn(`Game ${gameId} does not exist.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Game does not exist.',
                };
            }
            if (!tile) {
                console.warn(`Tile ${tileId} does not exist.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Tile does not exist.',
                };
            }
            if (!player) {
                console.warn(`Player ${playerId} does not exists.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Player does not exists.',
                };
            }
            if (tile.picked) {
                console.warn(`Tile ${tileId} is already picked.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Tile is already picked.',
                };
            }

            const playerTeam = game.teams.find(({ team }) => player.teams.includes(team));

            if (!playerTeam) {
                console.warn(`Player ${playerId} is not on a team.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! Player is not on a team.',
                };
            }
            if (playerTeam.side !== game.turn) {
                console.warn(`It's not your turn ${playerId}.`);
                return {
                    success: false,
                    status: 500,
                    error: 'Error! It\'s not your turn.',
                };
            }

            // Maybe add the code below in a try and catch and return a 500?
            tile.picked = true;
            console.info(`Picked tile: ${tileId}`);
            
            // Break up into functions
            const team = game.teams.find(({ side }) => side === tile.side);
            team.score += 1;
            console.info(`Team ${team.team} won a point and a score of ${team.score}.`);
            game.turn = game.turn === Sides.RED ? Sides.BLUE : Sides.RED;
            console.info(`${game.turn}'s turn.`);

            return {
                success: true,
                status: 200,
            };
        },
    },
  };
