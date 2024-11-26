import { Player, Team, GameResult } from './types';
import { players } from './players';
import { teams } from './teams';
import { gameResults } from './results';

export * from './types';
export { players } from './players';
export { teams } from './teams';
export { gameResults } from './results';

// Helper functions to get data
export const getPlayerById = (id: string): Player | undefined => {
  return players.find((player: Player) => player.id === id);
};

export const getTeamById = (id: string): Team | undefined => {
  return teams.find((team: Team) => team.id === id);
};

export const getTeamPlayers = (teamId: string): Player[] => {
  return players.filter((player: Player) => player.teamId === teamId);
};

export const getGamesByTeam = (teamId: string): GameResult[] => {
  return gameResults.filter((game: GameResult) => 
    game.homeTeamId === teamId || game.awayTeamId === teamId
  );
};

export const getGamesByWeek = (week: number): GameResult[] => {
  return gameResults.filter((game: GameResult) => game.week === week);
};

// Get team's win/loss record
export const getTeamRecord = (teamId: string): { wins: number; losses: number } => {
  const games = getGamesByTeam(teamId);
  let wins = 0;
  let losses = 0;

  games.forEach((game: GameResult) => {
    if (game.homeTeamId === teamId) {
      if (game.homeScore > game.awayScore) wins++;
      else losses++;
    } else {
      if (game.awayScore > game.homeScore) wins++;
      else losses++;
    }
  });

  return { wins, losses };
};
