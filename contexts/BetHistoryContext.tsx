import React, { createContext, useContext, useState, ReactNode } from 'react';

type Bet = {
  id: string;
  sport: string;
  event: string;
  market: string;
  selection: string;
  odds: number;
  amount: number;
  timestamp: number;
  result?: 'win' | 'lose' | 'pending';
};

type BetHistoryContextType = {
  bets: Bet[];
  placeBet: (bet: Omit<Bet, 'id' | 'timestamp' | 'result'>) => void;
  clearHistory: () => void;
};

const BetHistoryContext = createContext<BetHistoryContextType | undefined>(undefined);

export const BetHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [bets, setBets] = useState<Bet[]>([]);

  const placeBet = (bet: Omit<Bet, 'id' | 'timestamp' | 'result'>) => {
    const newBet: Bet = {
      ...bet,
      id: Math.random().toString(36).substring(2, 10),
      timestamp: Date.now(),
      result: 'pending',
    };
    setBets((prev) => [newBet, ...prev]);
  };

  const clearHistory = () => setBets([]);

  return (
    <BetHistoryContext.Provider value={{ bets, placeBet, clearHistory }}>
      {children}
    </BetHistoryContext.Provider>
  );
};

export const useBetHistory = (): BetHistoryContextType => {
  const context = useContext(BetHistoryContext);
  if (!context) {
    throw new Error('useBetHistory must be used within a BetHistoryProvider');
  }
  return context;
};
