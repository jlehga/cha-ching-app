// MOCK_BET_HISTORY.ts - Enhanced bet history data for AI analysis
export const MOCK_BET_HISTORY = [
  // NBA Bets - Mixed Results
  {
    id: 'bet_001',
    sport: 'NBA',
    event: 'Lakers vs Warriors',
    market: 'Point Spread',
    selection: 'Lakers -3.5',
    odds: -110,
    amount: 100,
    timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: 'settled',
    result: 'win',
    matchedAt: Date.now() - (7 * 24 * 60 * 60 * 1000) + 300000,
    settledAt: Date.now() - (6 * 24 * 60 * 60 * 1000),
    profit: 90.91,
    roi: 0.91,
    confidence: 0.75,
    betType: 'spread',
    timeOfDay: 'evening',
    dayOfWeek: 'saturday'
  },
  {
    id: 'bet_002',
    sport: 'NBA',
    event: 'Celtics vs Heat',
    market: 'Moneyline',
    selection: 'Celtics',
    odds: +150,
    amount: 50,
    timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'lose',
    matchedAt: Date.now() - (6 * 24 * 60 * 60 * 1000) + 180000,
    settledAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
    profit: -50,
    roi: -1.0,
    confidence: 0.65,
    betType: 'moneyline',
    timeOfDay: 'night',
    dayOfWeek: 'sunday'
  },
  {
    id: 'bet_003',
    sport: 'NBA',
    event: 'Nets vs Knicks',
    market: 'Total Points',
    selection: 'Over 220.5',
    odds: -105,
    amount: 75,
    timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'win',
    matchedAt: Date.now() - (5 * 24 * 60 * 60 * 1000) + 240000,
    settledAt: Date.now() - (4 * 24 * 60 * 60 * 1000),
    profit: 71.43,
    roi: 0.95,
    confidence: 0.80,
    betType: 'total',
    timeOfDay: 'evening',
    dayOfWeek: 'monday'
  },
  
  // NFL Bets - Strong Performance
  {
    id: 'bet_004',
    sport: 'NFL',
    event: 'Chiefs vs Bills',
    market: 'Point Spread',
    selection: 'Chiefs -2.5',
    odds: -110,
    amount: 200,
    timestamp: Date.now() - (14 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'win',
    matchedAt: Date.now() - (14 * 24 * 60 * 60 * 1000) + 600000,
    settledAt: Date.now() - (13 * 24 * 60 * 60 * 1000),
    profit: 181.82,
    roi: 0.91,
    confidence: 0.85,
    betType: 'spread',
    timeOfDay: 'afternoon',
    dayOfWeek: 'sunday'
  },
  {
    id: 'bet_005',
    sport: 'NFL',
    event: 'Eagles vs Cowboys',
    market: 'Moneyline',
    selection: 'Eagles',
    odds: +120,
    amount: 150,
    timestamp: Date.now() - (13 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'win',
    matchedAt: Date.now() - (13 * 24 * 60 * 60 * 1000) + 420000,
    settledAt: Date.now() - (12 * 24 * 60 * 60 * 1000),
    profit: 180,
    roi: 1.2,
    confidence: 0.70,
    betType: 'moneyline',
    timeOfDay: 'night',
    dayOfWeek: 'monday'
  },
  
  // MLB Bets - Mixed Results
  {
    id: 'bet_006',
    sport: 'MLB',
    event: 'Yankees vs Red Sox',
    market: 'Run Line',
    selection: 'Yankees -1.5',
    odds: +110,
    amount: 80,
    timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'lose',
    matchedAt: Date.now() - (3 * 24 * 60 * 60 * 1000) + 120000,
    settledAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
    profit: -80,
    roi: -1.0,
    confidence: 0.60,
    betType: 'runline',
    timeOfDay: 'evening',
    dayOfWeek: 'friday'
  },
  {
    id: 'bet_007',
    sport: 'MLB',
    event: 'Dodgers vs Giants',
    market: 'Total Runs',
    selection: 'Under 8.5',
    odds: -115,
    amount: 120,
    timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'win',
    matchedAt: Date.now() - (2 * 24 * 60 * 60 * 1000) + 180000,
    settledAt: Date.now() - (1 * 24 * 60 * 60 * 1000),
    profit: 104.35,
    roi: 0.87,
    confidence: 0.75,
    betType: 'total',
    timeOfDay: 'night',
    dayOfWeek: 'saturday'
  },
  
  // NHL Bets - Good Performance
  {
    id: 'bet_008',
    sport: 'NHL',
    event: 'Bruins vs Maple Leafs',
    market: 'Moneyline',
    selection: 'Bruins',
    odds: +130,
    amount: 90,
    timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'win',
    matchedAt: Date.now() - (4 * 24 * 60 * 60 * 1000) + 300000,
    settledAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
    profit: 117,
    roi: 1.3,
    confidence: 0.70,
    betType: 'moneyline',
    timeOfDay: 'evening',
    dayOfWeek: 'thursday'
  },
  
  // Soccer Bets - Poor Performance
  {
    id: 'bet_009',
    sport: 'Soccer',
    event: 'Manchester United vs Liverpool',
    market: 'Match Winner',
    selection: 'Manchester United',
    odds: +200,
    amount: 60,
    timestamp: Date.now() - (8 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'lose',
    matchedAt: Date.now() - (8 * 24 * 60 * 60 * 1000) + 240000,
    settledAt: Date.now() - (7 * 24 * 60 * 60 * 1000),
    profit: -60,
    roi: -1.0,
    confidence: 0.55,
    betType: 'moneyline',
    timeOfDay: 'morning',
    dayOfWeek: 'sunday'
  },
  {
    id: 'bet_010',
    sport: 'Soccer',
    event: 'Arsenal vs Chelsea',
    market: 'Both Teams to Score',
    selection: 'Yes',
    odds: -120,
    amount: 100,
    timestamp: Date.now() - (9 * 24 * 60 * 60 * 1000),
    status: 'settled',
    result: 'win',
    matchedAt: Date.now() - (9 * 24 * 60 * 60 * 1000) + 180000,
    settledAt: Date.now() - (8 * 24 * 60 * 60 * 1000),
    profit: 83.33,
    roi: 0.83,
    confidence: 0.80,
    betType: 'prop',
    timeOfDay: 'afternoon',
    dayOfWeek: 'saturday'
  },
  
  // Recent Open Bets
  {
    id: 'bet_011',
    sport: 'NBA',
    event: 'Suns vs Nuggets',
    market: 'Point Spread',
    selection: 'Suns +4.5',
    odds: -110,
    amount: 125,
    timestamp: Date.now() - (2 * 60 * 60 * 1000), // 2 hours ago
    status: 'matched',
    result: 'pending',
    matchedAt: Date.now() - (1 * 60 * 60 * 1000),
    profit: 0,
    roi: 0,
    confidence: 0.70,
    betType: 'spread',
    timeOfDay: 'evening',
    dayOfWeek: 'tuesday'
  },
  {
    id: 'bet_012',
    sport: 'NFL',
    event: 'Ravens vs Bengals',
    market: 'Total Points',
    selection: 'Under 45.5',
    odds: -105,
    amount: 200,
    timestamp: Date.now() - (30 * 60 * 1000), // 30 minutes ago
    status: 'unmatched',
    result: 'pending',
    profit: 0,
    roi: 0,
    confidence: 0.65,
    betType: 'total',
    timeOfDay: 'night',
    dayOfWeek: 'tuesday'
  }
];

// AI Analysis Data Structure
export type AIAnalysisData = {
  totalBets: number;
  winRate: number;
  totalProfit: number;
  averageROI: number;
  bestSport: { sport: string; winRate: number; profit: number };
  worstSport: { sport: string; winRate: number; profit: number };
  bestBetType: { type: string; winRate: number; profit: number };
  worstBetType: { type: string; winRate: number; profit: number };
  bestTimeOfDay: { time: string; winRate: number; profit: number };
  bestDayOfWeek: { day: string; winRate: number; profit: number };
  confidenceCorrelation: number;
  averageBetSize: number;
  profitTrend: 'increasing' | 'decreasing' | 'stable';
  recommendations: string[];
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
};

// AI Preferences Structure
export type AIPreferences = {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  preferredSports: string[];
  preferredBetTypes: string[];
  preferredTimeOfDay: string[];
  preferredDaysOfWeek: string[];
  maxBetSize: number;
  minConfidence: number;
  targetROI: number;
  maxConcurrentBets: number;
};

// Mock AI Analysis Results
export const MOCK_AI_ANALYSIS: AIAnalysisData = {
  totalBets: 12,
  winRate: 0.67, // 8 wins out of 12 settled bets
  totalProfit: 648.44,
  averageROI: 0.54,
  bestSport: { sport: 'NFL', winRate: 1.0, profit: 361.82 },
  worstSport: { sport: 'Soccer', winRate: 0.5, profit: 23.33 },
  bestBetType: { type: 'spread', winRate: 0.75, profit: 272.73 },
  worstBetType: { type: 'moneyline', winRate: 0.5, profit: 247 },
  bestTimeOfDay: { time: 'evening', winRate: 0.75, profit: 354.26 },
  bestDayOfWeek: { day: 'sunday', winRate: 0.8, profit: 271.82 },
  confidenceCorrelation: 0.72,
  averageBetSize: 108.33,
  profitTrend: 'increasing',
  recommendations: [
    'Focus on NFL spread bets during Sunday evenings',
    'Avoid soccer moneyline bets - your win rate is only 50%',
    'Increase bet sizes on high-confidence NBA total bets',
    'Consider reducing exposure to MLB runline bets',
    'Your evening bets perform 15% better than other times'
  ],
  riskProfile: 'moderate'
};

// Mock AI Preferences
export const DEFAULT_AI_PREFERENCES: AIPreferences = {
  riskTolerance: 'moderate',
  preferredSports: ['NFL', 'NBA'],
  preferredBetTypes: ['spread', 'total'],
  preferredTimeOfDay: ['evening', 'night'],
  preferredDaysOfWeek: ['sunday', 'monday'],
  maxBetSize: 200,
  minConfidence: 0.65,
  targetROI: 0.8,
  maxConcurrentBets: 3
}; 