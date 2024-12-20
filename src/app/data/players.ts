import { Player } from './types';

const baseStats = {
  touches: 0,
  convertis: 0,
  attrapes: 0,
  rabattus: 0,
  interceptions: 0,
  sacks: 0,
  passingYards: 0,
  rushingYards: 0,
  gamesPlayed: 0,
  touchdownsPerGame: 0,
  yardsPerGame: 0,
  penalites: 0
};

export const players: Player[] = [
  // Eagles
  {
    id: "jeremy-noel",
    firstName: "Jérémy",
    lastName: "NOËL",
    name: "Jérémy NOËL",
    number: 14,
    teamId: "eagles",
    team: "Eagles",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 27,
    experience: "7",
    stats: { ...baseStats }
  },
  {
    id: "kaven-roy",
    firstName: "Kaven",
    lastName: "ROY",
    name: "Kaven ROY",
    number: 25,
    teamId: "eagles",
    team: "Eagles",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 27,
    experience: "4",
    stats: { ...baseStats }
  },
  {
    id: "zach-heon",
    firstName: "Zach",
    lastName: "HÉON",
    name: "Zach HÉON",
    number: 1,
    teamId: "eagles",
    team: "Eagles",
    positionOffensive: "Rusher",
    positionDefensive: "LB",
    age: 27,
    experience: "3",
    stats: { ...baseStats }
  },
  {
    id: "olivier-marcotte",
    firstName: "Olivier",
    lastName: "MARCOTTE",
    name: "Olivier MARCOTTE",
    number: 17,
    teamId: "eagles",
    team: "Eagles",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 27,
    experience: "6",
    stats: { ...baseStats }
  },
  {
    id: "william-roy",
    firstName: "William",
    lastName: "ROY",
    name: "William ROY",
    number: 36,
    teamId: "eagles",
    team: "Eagles",
    positionOffensive: "Snap",
    positionDefensive: "LB",
    age: 27,
    experience: "5",
    stats: { ...baseStats }
  },
  {
    id: "olivier-leblanc",
    firstName: "Olivier",
    lastName: "LEBLANC",
    name: "Olivier LEBLANC",
    number: 7,
    teamId: "eagles",
    team: "Eagles",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 27,
    experience: "3",
    stats: { ...baseStats }
  },
  {
    id: "michael-frechette",
    firstName: "Michael",
    lastName: "FRÉCHETTE",
    name: "Michael FRÉCHETTE",
    number: 10,
    teamId: "eagles",
    team: "Eagles",
    positionOffensive: "QB",
    positionDefensive: "S",
    age: 27,
    experience: "4",
    stats: { ...baseStats }
  },

  // Vikings
  {
    id: "yannick-germain",
    firstName: "Yannick",
    lastName: "GERMAIN",
    name: "Yannick GERMAIN",
    number: 7,
    teamId: "vikings",
    team: "Vikings",
    positionOffensive: "QB",
    positionDefensive: "S",
    age: 33,
    experience: "11",
    stats: { ...baseStats }
  },
  {
    id: "sebastien-landry",
    firstName: "Sébastien",
    lastName: "LANDRY",
    name: "Sébastien LANDRY",
    number: 21,
    teamId: "vikings",
    team: "Vikings",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 33,
    experience: "9",
    stats: { ...baseStats }
  },
  {
    id: "sebastien-allard",
    firstName: "Sébastien",
    lastName: "ALLARD",
    name: "Sébastien ALLARD",
    number: 52,
    teamId: "vikings",
    team: "Vikings",
    positionOffensive: "Snap",
    positionDefensive: "LB",
    age: 29,
    experience: "7",
    stats: { ...baseStats }
  },
  {
    id: "phil-bois",
    firstName: "Phil",
    lastName: "BOIS",
    name: "Phil BOIS",
    number: 22,
    teamId: "vikings",
    team: "Vikings",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 41,
    experience: "4",
    stats: { ...baseStats }
  },
  {
    id: "patrick-desruisseaux",
    firstName: "Patrick",
    lastName: "DESRUISSEAUX",
    name: "Patrick DESRUISSEAUX",
    number: 6,
    teamId: "vikings",
    team: "Vikings",
    positionOffensive: "Rush",
    positionDefensive: "LB",
    age: 29,
    experience: "7",
    stats: { ...baseStats }
  },
  {
    id: "jordan-paradis",
    firstName: "Jordan",
    lastName: "PARADIS",
    name: "Jordan PARADIS",
    number: 20,
    teamId: "vikings",
    team: "Vikings",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 28,
    experience: "8",
    stats: { ...baseStats }
  },
  {
    id: "jeremy-theroux",
    firstName: "Jérémy",
    lastName: "THÉROUX",
    name: "Jérémy THÉROUX",
    number: 13,
    teamId: "vikings",
    team: "Vikings",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 32,
    experience: "2",
    stats: { ...baseStats }
  },
  {
    id: "dylan-leroux",
    firstName: "Dylan",
    lastName: "LEROUX",
    name: "Dylan LEROUX",
    number: 88,
    teamId: "vikings",
    team: "Vikings",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 24,
    experience: "4",
    stats: { ...baseStats }
  },

  // Dirty Birds
  {
    id: "joel-therrien",
    firstName: "Joel",
    lastName: "THERRIEN",
    name: "Joel THERRIEN",
    number: 1,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 24,
    experience: "7",
    stats: { ...baseStats }
  },
  {
    id: "gabriel-largie",
    firstName: "Gabriel",
    lastName: "LARGIE",
    name: "Gabriel LARGIE",
    number: 10,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 24,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "frederick-cassin",
    firstName: "Frédérick",
    lastName: "CASSIN",
    name: "Frédérick CASSIN",
    number: 17,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 17,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "felix-turgeon",
    firstName: "Félix",
    lastName: "TURGEON",
    name: "Félix TURGEON",
    number: 11,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "QB",
    positionDefensive: "S",
    age: 25,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "emile-poisson",
    firstName: "Emile",
    lastName: "POISSON",
    name: "Emile POISSON",
    number: 4,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "Snap",
    positionDefensive: "LB",
    age: 25,
    experience: "5",
    stats: { ...baseStats }
  },
  {
    id: "christophe-mailhot",
    firstName: "Christophe",
    lastName: "MAILHOT",
    name: "Christophe MAILHOT",
    number: 2,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 24,
    experience: "6",
    stats: { ...baseStats }
  },
  {
    id: "christophe-laroche",
    firstName: "Christophe",
    lastName: "Laroche",
    name: "Christophe Laroche",
    number: 24,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "Rusher",
    positionDefensive: "LB",
    age: 24,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "cedric-dery",
    firstName: "Cédric",
    lastName: "DERY",
    name: "Cédric DERY",
    number: 6,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "HB",
    positionDefensive: "LB",
    age: 24,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "alex-gagnon",
    firstName: "Alex",
    lastName: "GAGNON",
    name: "Alex GAGNON",
    number: 0,
    teamId: "dirty-birds",
    team: "Dirty Birds",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 24,
    experience: "1",
    stats: { ...baseStats }
  },

  // PCP
  {
    id: "benjamin-nolette",
    firstName: "Benjamin",
    lastName: "NOLETTE",
    name: "Benjamin NOLETTE",
    number: 2,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 27,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "xavier-houle",
    firstName: "Xavier",
    lastName: "HOULE",
    name: "Xavier HOULE",
    number: 64,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "Snap",
    positionDefensive: "LB",
    age: 26,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "cedrick-mayrand",
    firstName: "Cédrick",
    lastName: "MAYRAND",
    name: "Cédrick MAYRAND",
    number: 21,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 31,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "vincent-petit",
    firstName: "Vincent",
    lastName: "PETIT",
    name: "Vincent PETIT",
    number: 33,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 30,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "mike-petit",
    firstName: "Mike",
    lastName: "PETIT",
    name: "Mike PETIT",
    number: 52,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 31,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "ravanty-bolduc",
    firstName: "Ravanty",
    lastName: "BOLDUC",
    name: "Ravanty BOLDUC",
    number: 5,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 28,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "armand-balla",
    firstName: "Armand",
    lastName: "BALLA",
    name: "Armand BALLA",
    number: 3,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 26,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "felix-laroche",
    firstName: "Félix",
    lastName: "LAROCHE",
    name: "Félix LAROCHE",
    number: 4,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 27,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "antoine-marcoux",
    firstName: "Antoine",
    lastName: "MARCOUX",
    name: "Antoine MARCOUX",
    number: 8,
    teamId: "pcp",
    team: "PCP",
    positionOffensive: "QB",
    positionDefensive: "S",
    age: 28,
    experience: "",
    stats: { ...baseStats }
  },

  // Les Filles de Caleb
  {
    id: "thomas-raymond",
    firstName: "Thomas",
    lastName: "RAYMOND",
    name: "Thomas RAYMOND",
    number: 80,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "QB",
    positionDefensive: "S",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "raphael-laroche",
    firstName: "Raphael",
    lastName: "LAROCHE",
    name: "Raphael LAROCHE",
    number: 13,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "olivier-morin",
    firstName: "Olivier",
    lastName: "MORIN",
    name: "Olivier MORIN",
    number: 20,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "matis-crete",
    firstName: "Matis",
    lastName: "CRETE",
    name: "Matis CRETE",
    number: 16,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "RB",
    positionDefensive: "LB",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "kevin-lemay",
    firstName: "Kevin",
    lastName: "LEMAY",
    name: "Kevin LEMAY",
    number: 2,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "jeremy-crete",
    firstName: "Jeremy",
    lastName: "CRETE",
    name: "Jeremy CRETE",
    number: 1,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "jacob-ricard",
    firstName: "Jacob",
    lastName: "RICARD",
    name: "Jacob RICARD",
    number: 22,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "frederick-gagne",
    firstName: "Frédérick",
    lastName: "GAGNÉ",
    name: "Frédérick GAGNÉ",
    number: 24,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "felix-antoine-binette",
    firstName: "Félix-Antoine",
    lastName: "BINETTE",
    name: "Félix-Antoine BINETTE",
    number: 5,
    teamId: "filles-de-caleb",
    team: "Les Filles de Caleb",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 25,
    experience: "",
    stats: { ...baseStats }
  },

  // Les bons buveurs
  {
    id: "thomas-pichette",
    firstName: "Thomas",
    lastName: "PICHETTE",
    name: "Thomas PICHETTE",
    number: 85,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 23,
    experience: "5",
    stats: { ...baseStats }
  },
  {
    id: "jacob-maurais",
    firstName: "Jacob",
    lastName: "MAURAIS",
    name: "Jacob MAURAIS",
    number: 9,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 17,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "philippe-rolland",
    firstName: "Philippe",
    lastName: "ROLLAND",
    name: "Philippe ROLLAND",
    number: 15,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 19,
    experience: "0",
    stats: { ...baseStats }
  },
  {
    id: "nolan-rivard-pichette",
    firstName: "Nolan",
    lastName: "RIVARD PICHETTE",
    name: "Nolan RIVARD PICHETTE",
    number: 23,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 19,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "alexandre-gouin",
    firstName: "Alexandre",
    lastName: "GOUIN",
    name: "Alexandre GOUIN",
    number: 3,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 19,
    experience: "0",
    stats: { ...baseStats }
  },
  {
    id: "tristan-dubreuil",
    firstName: "Tristan",
    lastName: "DUBREUIL",
    name: "Tristan DUBREUIL",
    number: 31,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "0",
    stats: { ...baseStats }
  },
  {
    id: "olivier-mongeau",
    firstName: "Olivier",
    lastName: "MONGEAU",
    name: "Olivier MONGEAU",
    number: 5,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "0",
    stats: { ...baseStats }
  },
  {
    id: "zachary-mainville",
    firstName: "Zachary",
    lastName: "MAINVILLE",
    name: "Zachary MAINVILLE",
    number: 99,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "0",
    stats: { ...baseStats }
  },
  {
    id: "samuel-arsenault",
    firstName: "Samuel",
    lastName: "ARSENAULT",
    name: "Samuel ARSENAULT",
    number: 11,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "0",
    stats: { ...baseStats }
  },
  {
    id: "william-leclerc",
    firstName: "William",
    lastName: "LECLERC",
    name: "William LECLERC",
    number: 1,
    teamId: "bons-buveurs",
    team: "Les bons buveurs",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "7",
    stats: { ...baseStats }
  },

  // Destroyers
  {
    id: "antoine-jubinville-nadeau",
    firstName: "Antoine",
    lastName: "JUBINVILLE NADEAU",
    name: "Antoine JUBINVILLE NADEAU",
    number: 69,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 17,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "jay-vigneault",
    firstName: "Jay",
    lastName: "VIGNEAULT",
    name: "Jay VIGNEAULT",
    number: 85,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 19,
    experience: "0",
    stats: { ...baseStats }
  },
  {
    id: "emile-marcotte",
    firstName: "Émile",
    lastName: "MARCOTTE",
    name: "Émile MARCOTTE",
    number: 6,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "6",
    stats: { ...baseStats }
  },
  {
    id: "loic-berube",
    firstName: "Loic",
    lastName: "BÉRUBÉ",
    name: "Loic BÉRUBÉ",
    number: 7,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "lincourt-adonis",
    firstName: "Lincourt",
    lastName: "ADONIS",
    name: "Lincourt ADONIS",
    number: 1,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "eliot-tanguay",
    firstName: "Eliot",
    lastName: "TANGUAY",
    name: "Eliot TANGUAY",
    number: 44,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rush",
    positionDefensive: "LB",
    age: 18,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "noah-martineau",
    firstName: "Noah",
    lastName: "MARTINEAU",
    name: "Noah MARTINEAU",
    number: 2,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "raphael-poletti",
    firstName: "Raphael",
    lastName: "POLETTI",
    name: "Raphael POLETTI",
    number: 5,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "louis-felix-rene",
    firstName: "Louis-Félix",
    lastName: "RENÉ",
    name: "Louis-Félix RENÉ",
    number: 70,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Snap",
    positionDefensive: "LB",
    age: 18,
    experience: "1",
    stats: { ...baseStats }
  },
  {
    id: "jacob-des-roberts",
    firstName: "Jacob",
    lastName: "Des Roberts",
    name: "Jacob Des Roberts",
    number: 3,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "Rec",
    positionDefensive: "CB",
    age: 18,
    experience: "",
    stats: { ...baseStats }
  },
  {
    id: "sebastien-lessard",
    firstName: "Sebastien",
    lastName: "LESSARD",
    name: "Sebastien LESSARD",
    number: 12,
    teamId: "destroyers",
    team: "Destroyers",
    positionOffensive: "QB",
    positionDefensive: "S",
    age: 18,
    experience: "0",
    stats: { ...baseStats }
  }
];

export default players;
