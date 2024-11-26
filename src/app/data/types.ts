export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  name: string;  // Full name
  number: number;
  teamId: string;
  team: string;  // Team name
  position: string;
  photo?: string;
  age: number;
  experience: string;
  stats: {
    touches: number;      // Touchdowns
    convertis: number;    // Conversions
    attrapes: number;     // Catches/Receptions
    rabattus: number;     // Deflections
    interceptions: number;
    sacks: number;
    passingYards: number;
    rushingYards: number;
    gamesPlayed: number;
    touchdownsPerGame: number;
    yardsPerGame: number;
    penalites: number;    // Penalties
  };
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  city: string;
  coach: string;
  capitaines: string;
  players: string[]; // Array of player IDs
  stats?: TeamStats;
  primaryColor: string;   // Primary team color in hex format
  secondaryColor: string; // Secondary team color in hex format
}

export interface GameResult {
  id: string;
  date: string;
  time?: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  homeFirstHalf: number;
  homeSecondHalf: number;
  awayFirstHalf: number;
  awaySecondHalf: number;
  location: string;
  week: number;
  isJamboree?: boolean;
}

export interface TeamStats {
  teamId: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  touchdownsScored: number;
  touchdownsAllowed: number;
}
