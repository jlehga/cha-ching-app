export interface LiveGame {
  id: string;
  roomId: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'upcoming' | 'final';
  quarter: string;
  timeRemaining: string;
  gameTime: string;
  activeUsers: number;
  isActive: boolean;
}

export const MOCK_LIVE_SCORES: LiveGame[] = [
  // Live Games
  {
    id: 'game1',
    roomId: 'lakers_warriors_20240115',
    sport: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    homeScore: 105,
    awayScore: 98,
    status: 'live',
    quarter: '4th',
    timeRemaining: '2:45',
    gameTime: '19:30',
    activeUsers: 47,
    isActive: true
  },
  {
    id: 'game2',
    roomId: 'celtics_heat_20240115',
    sport: 'NBA',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    quarter: 'Pre-game',
    timeRemaining: '30:00',
    gameTime: '20:00',
    activeUsers: 12,
    isActive: true
  },
  {
    id: 'game3',
    roomId: 'chiefs_raiders_20240115',
    sport: 'NFL',
    homeTeam: 'Chiefs',
    awayTeam: 'Raiders',
    homeScore: 28,
    awayScore: 14,
    status: 'final',
    quarter: 'Final',
    timeRemaining: '0:00',
    gameTime: '18:00',
    activeUsers: 23,
    isActive: false
  },
  {
    id: 'game4',
    roomId: 'nets_knicks_20240115',
    sport: 'NBA',
    homeTeam: 'Nets',
    awayTeam: 'Knicks',
    homeScore: 87,
    awayScore: 82,
    status: 'live',
    quarter: '3rd',
    timeRemaining: '4:32',
    gameTime: '19:45',
    activeUsers: 34,
    isActive: true
  },
  {
    id: 'game5',
    roomId: 'bucks_bulls_20240115',
    sport: 'NBA',
    homeTeam: 'Bucks',
    awayTeam: 'Bulls',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    quarter: 'Pre-game',
    timeRemaining: '45:00',
    gameTime: '20:30',
    activeUsers: 8,
    isActive: true
  },
  {
    id: 'game6',
    roomId: 'eagles_cowboys_20240115',
    sport: 'NFL',
    homeTeam: 'Eagles',
    awayTeam: 'Cowboys',
    homeScore: 24,
    awayScore: 21,
    status: 'final',
    quarter: 'Final',
    timeRemaining: '0:00',
    gameTime: '17:00',
    activeUsers: 56,
    isActive: false
  },
  {
    id: 'game7',
    roomId: 'yankees_redsox_20240115',
    sport: 'MLB',
    homeTeam: 'Yankees',
    awayTeam: 'Red Sox',
    homeScore: 3,
    awayScore: 2,
    status: 'live',
    quarter: '7th',
    timeRemaining: '2:15',
    gameTime: '19:15',
    activeUsers: 29,
    isActive: true
  },
  {
    id: 'game8',
    roomId: 'dodgers_giants_20240115',
    sport: 'MLB',
    homeTeam: 'Dodgers',
    awayTeam: 'Giants',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    quarter: 'Pre-game',
    timeRemaining: '15:00',
    gameTime: '21:00',
    activeUsers: 18,
    isActive: true
  }
];

export const getLiveGames = () => {
  return MOCK_LIVE_SCORES.filter(game => game.status === 'live');
};

export const getUpcomingGames = () => {
  return MOCK_LIVE_SCORES.filter(game => game.status === 'upcoming');
};

export const getRecentGames = () => {
  return MOCK_LIVE_SCORES.filter(game => game.status === 'final');
}; 