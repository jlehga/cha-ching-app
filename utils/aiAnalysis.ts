// AI Analysis Utility - Ready for Gemini Integration
import { MOCK_BET_HISTORY, AIAnalysisData, AIPreferences } from '../data/mock_bet_history';

// Function to analyze betting history and generate insights
export const analyzeBettingHistory = async (
  betHistory: typeof MOCK_BET_HISTORY,
  preferences: AIPreferences
): Promise<AIAnalysisData> => {
  // This function will be replaced with Gemini API call
  // For now, return mock analysis based on actual bet history
  
  const settledBets = betHistory.filter(bet => bet.status === 'settled');
  const totalBets = settledBets.length;
  const winningBets = settledBets.filter(bet => bet.result === 'win');
  const winRate = totalBets > 0 ? winningBets.length / totalBets : 0;
  
  const totalProfit = settledBets.reduce((sum, bet) => sum + (bet.profit || 0), 0);
  const averageROI = totalBets > 0 ? totalProfit / settledBets.reduce((sum, bet) => sum + bet.amount, 0) : 0;
  
  // Calculate best/worst sports
  const sportStats = calculateSportStats(settledBets);
  const bestSport = sportStats.best;
  const worstSport = sportStats.worst;
  
  // Calculate best/worst bet types
  const betTypeStats = calculateBetTypeStats(settledBets);
  const bestBetType = betTypeStats.best;
  const worstBetType = betTypeStats.worst;
  
  // Calculate best time of day and day of week
  const timeStats = calculateTimeStats(settledBets);
  const bestTimeOfDay = timeStats.bestTime;
  const bestDayOfWeek = timeStats.bestDay;
  
  // Calculate confidence correlation
  const confidenceCorrelation = calculateConfidenceCorrelation(settledBets);
  
  // Calculate average bet size
  const averageBetSize = settledBets.reduce((sum, bet) => sum + bet.amount, 0) / totalBets;
  
  // Determine profit trend
  const profitTrend = determineProfitTrend(settledBets);
  
  // Generate recommendations based on analysis
  const recommendations = generateRecommendations(
    settledBets,
    sportStats,
    betTypeStats,
    timeStats,
    preferences
  );
  
  // Determine risk profile
  const riskProfile = determineRiskProfile(settledBets, preferences);
  
  return {
    totalBets,
    winRate,
    totalProfit,
    averageROI,
    bestSport,
    worstSport,
    bestBetType,
    worstBetType,
    bestTimeOfDay,
    bestDayOfWeek,
    confidenceCorrelation,
    averageBetSize,
    profitTrend,
    recommendations,
    riskProfile
  };
};

// Helper functions for analysis
const calculateSportStats = (bets: typeof MOCK_BET_HISTORY) => {
  const sportMap = new Map<string, { wins: number; total: number; profit: number }>();
  
  bets.forEach(bet => {
    const sport = bet.sport;
    const current = sportMap.get(sport) || { wins: 0, total: 0, profit: 0 };
    current.total++;
    if (bet.result === 'win') current.wins++;
    current.profit += bet.profit || 0;
    sportMap.set(sport, current);
  });
  
  let best = { sport: 'N/A', winRate: 0, profit: 0 };
  let worst = { sport: 'N/A', winRate: 1, profit: 0 };
  
  sportMap.forEach((stats, sport) => {
    const winRate = stats.total > 0 ? stats.wins / stats.total : 0;
    const profit = stats.profit;
    
    if (winRate > best.winRate || (winRate === best.winRate && profit > best.profit)) {
      best = { sport, winRate, profit };
    }
    
    if (winRate < worst.winRate || (winRate === worst.winRate && profit < worst.profit)) {
      worst = { sport, winRate, profit };
    }
  });
  
  return { best, worst };
};

const calculateBetTypeStats = (bets: typeof MOCK_BET_HISTORY) => {
  const typeMap = new Map<string, { wins: number; total: number; profit: number }>();
  
  bets.forEach(bet => {
    const type = bet.betType;
    const current = typeMap.get(type) || { wins: 0, total: 0, profit: 0 };
    current.total++;
    if (bet.result === 'win') current.wins++;
    current.profit += bet.profit || 0;
    typeMap.set(type, current);
  });
  
  let best = { type: 'N/A', winRate: 0, profit: 0 };
  let worst = { type: 'N/A', winRate: 1, profit: 0 };
  
  typeMap.forEach((stats, type) => {
    const winRate = stats.total > 0 ? stats.wins / stats.total : 0;
    const profit = stats.profit;
    
    if (winRate > best.winRate || (winRate === best.winRate && profit > best.profit)) {
      best = { type, winRate, profit };
    }
    
    if (winRate < worst.winRate || (winRate === worst.winRate && profit < worst.profit)) {
      worst = { type, winRate, profit };
    }
  });
  
  return { best, worst };
};

const calculateTimeStats = (bets: typeof MOCK_BET_HISTORY) => {
  const timeMap = new Map<string, { wins: number; total: number; profit: number }>();
  const dayMap = new Map<string, { wins: number; total: number; profit: number }>();
  
  bets.forEach(bet => {
    // Time of day
    const time = bet.timeOfDay;
    const timeCurrent = timeMap.get(time) || { wins: 0, total: 0, profit: 0 };
    timeCurrent.total++;
    if (bet.result === 'win') timeCurrent.wins++;
    timeCurrent.profit += bet.profit || 0;
    timeMap.set(time, timeCurrent);
    
    // Day of week
    const day = bet.dayOfWeek;
    const dayCurrent = dayMap.get(day) || { wins: 0, total: 0, profit: 0 };
    dayCurrent.total++;
    if (bet.result === 'win') dayCurrent.wins++;
    dayCurrent.profit += bet.profit || 0;
    dayMap.set(day, dayCurrent);
  });
  
  let bestTime = { time: 'N/A', winRate: 0, profit: 0 };
  let bestDay = { day: 'N/A', winRate: 0, profit: 0 };
  
  timeMap.forEach((stats, time) => {
    const winRate = stats.total > 0 ? stats.wins / stats.total : 0;
    const profit = stats.profit;
    
    if (winRate > bestTime.winRate || (winRate === bestTime.winRate && profit > bestTime.profit)) {
      bestTime = { time, winRate, profit };
    }
  });
  
  dayMap.forEach((stats, day) => {
    const winRate = stats.total > 0 ? stats.wins / stats.total : 0;
    const profit = stats.profit;
    
    if (winRate > bestDay.winRate || (winRate === bestDay.winRate && profit > bestDay.profit)) {
      bestDay = { day, winRate, profit };
    }
  });
  
  return { bestTime, bestDay };
};

const calculateConfidenceCorrelation = (bets: typeof MOCK_BET_HISTORY) => {
  const confidenceBets = bets.filter(bet => bet.confidence !== undefined);
  if (confidenceBets.length === 0) return 0;
  
  const wins = confidenceBets.filter(bet => bet.result === 'win');
  const avgConfidenceWins = wins.reduce((sum, bet) => sum + (bet.confidence || 0), 0) / wins.length;
  const avgConfidenceAll = confidenceBets.reduce((sum, bet) => sum + (bet.confidence || 0), 0) / confidenceBets.length;
  
  return avgConfidenceWins / avgConfidenceAll;
};

const determineProfitTrend = (bets: typeof MOCK_BET_HISTORY) => {
  if (bets.length < 2) return 'stable';
  
  const sortedBets = [...bets].sort((a, b) => a.timestamp - b.timestamp);
  const firstHalf = sortedBets.slice(0, Math.floor(sortedBets.length / 2));
  const secondHalf = sortedBets.slice(Math.floor(sortedBets.length / 2));
  
  const firstHalfProfit = firstHalf.reduce((sum, bet) => sum + (bet.profit || 0), 0);
  const secondHalfProfit = secondHalf.reduce((sum, bet) => sum + (bet.profit || 0), 0);
  
  if (secondHalfProfit > firstHalfProfit * 1.1) return 'increasing';
  if (secondHalfProfit < firstHalfProfit * 0.9) return 'decreasing';
  return 'stable';
};

const generateRecommendations = (
  bets: typeof MOCK_BET_HISTORY,
  sportStats: any,
  betTypeStats: any,
  timeStats: any,
  preferences: AIPreferences
): string[] => {
  const recommendations: string[] = [];
  
  // Sport recommendations
  if (sportStats.best.winRate > 0.6) {
    recommendations.push(`Focus on ${sportStats.best.sport} bets - your win rate is ${Math.round(sportStats.best.winRate * 100)}%`);
  }
  
  if (sportStats.worst.winRate < 0.5) {
    recommendations.push(`Avoid ${sportStats.worst.sport} bets - your win rate is only ${Math.round(sportStats.worst.winRate * 100)}%`);
  }
  
  // Bet type recommendations
  if (betTypeStats.best.winRate > 0.6) {
    recommendations.push(`Increase exposure to ${betTypeStats.best.type} bets - ${Math.round(betTypeStats.best.winRate * 100)}% win rate`);
  }
  
  // Time-based recommendations
  if (timeStats.bestTime.winRate > 0.6) {
    recommendations.push(`Your ${timeStats.bestTime.time} bets perform ${Math.round((timeStats.bestTime.winRate - 0.5) * 100)}% better than average`);
  }
  
  // Risk-based recommendations
  if (preferences.riskTolerance === 'conservative') {
    recommendations.push('Consider increasing bet sizes on high-confidence bets to maximize returns');
  } else if (preferences.riskTolerance === 'aggressive') {
    recommendations.push('Monitor your risk exposure - consider diversifying across more bet types');
  }
  
  return recommendations;
};

const determineRiskProfile = (bets: typeof MOCK_BET_HISTORY, preferences: AIPreferences): 'conservative' | 'moderate' | 'aggressive' => {
  const avgBetSize = bets.reduce((sum, bet) => sum + bet.amount, 0) / bets.length;
  const avgOdds = bets.reduce((sum, bet) => sum + Math.abs(bet.odds), 0) / bets.length;
  
  if (avgBetSize < 100 && avgOdds < 150) return 'conservative';
  if (avgBetSize > 200 || avgOdds > 200) return 'aggressive';
  return 'moderate';
};

// Function to prepare data for Gemini API
export const prepareDataForGemini = (
  betHistory: typeof MOCK_BET_HISTORY,
  preferences: AIPreferences
) => {
  return {
    betHistory: betHistory.map(bet => ({
      sport: bet.sport,
      event: bet.event,
      market: bet.market,
      selection: bet.selection,
      odds: bet.odds,
      amount: bet.amount,
      result: bet.result,
      profit: bet.profit,
      confidence: bet.confidence,
      betType: bet.betType,
      timeOfDay: bet.timeOfDay,
      dayOfWeek: bet.dayOfWeek,
      timestamp: bet.timestamp
    })),
    preferences,
    analysisRequest: {
      includeRecommendations: true,
      includeRiskAssessment: true,
      includeTrendAnalysis: true,
      includeOptimizationSuggestions: true
    }
  };
};

// Function to call Gemini API (placeholder for future implementation)
export const callGeminiAPI = async (data: any): Promise<AIAnalysisData> => {
  // This will be implemented when we integrate with Gemini
  // For now, return mock analysis
  return analyzeBettingHistory(data.betHistory, data.preferences);
}; 