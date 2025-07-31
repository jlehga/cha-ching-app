import React, { createContext, useContext, useState, ReactNode } from 'react';

type BetStatus = 'matched' | 'unmatched' | 'open' | 'settled';

type Bet = {
  id: string;
  sport: string;
  event: string;
  market: string;
  selection: string;
  odds: number;
  amount: number;
  timestamp: number;
  status: BetStatus;
  result?: 'win' | 'lose' | 'pending';
  matchedAt?: number;
  settledAt?: number;
  // New fields for bet splitting
  originalBetId?: string; // Links to the original bet
  splitBets?: string[]; // Array of bet IDs that this bet was split into
  isSplitBet?: boolean; // Whether this is part of a split bet
  totalOriginalAmount?: number; // Original bet amount before splitting
  matchedAmount?: number; // How much has been matched so far
  remainingAmount?: number; // How much is still unmatched
};

type BetHistoryContextType = {
  bets: Bet[];
  placeBet: (bet: Omit<Bet, 'id' | 'timestamp' | 'status' | 'matchedAmount' | 'remainingAmount'>) => void;
  matchBet: (betId: string, matchedAmount: number) => void;
  settleBet: (betId: string, result: 'win' | 'lose') => void;
  clearHistory: () => void;
  getBetWithSplits: (betId: string) => Bet[];
};

const BetHistoryContext = createContext<BetHistoryContextType | undefined>(undefined);

export const BetHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [bets, setBets] = useState<Bet[]>([]);

  const placeBet = (bet: Omit<Bet, 'id' | 'timestamp' | 'status' | 'matchedAmount' | 'remainingAmount'>) => {
    const newBet: Bet = {
      ...bet,
      id: Math.random().toString(36).substring(2, 10),
      timestamp: Date.now(),
      status: 'unmatched',
      matchedAmount: 0,
      remainingAmount: bet.amount,
    };
    
    setBets((prev) => [newBet, ...prev]);
    
    // Simulate matching logic with bet splitting
    simulateBetMatching(newBet);
  };

  const simulateBetMatching = (originalBet: Bet) => {
    // Simulate finding liquidity in chunks
    const totalAmount = originalBet.amount;
    const chunks = generateBetChunks(totalAmount);
    let currentMatchedAmount = 0;
    const splitBetIds: string[] = [];

    chunks.forEach((chunkAmount, index) => {
      setTimeout(() => {
        // Create a split bet
        const splitBet: Bet = {
          id: Math.random().toString(36).substring(2, 10),
          sport: originalBet.sport,
          event: originalBet.event,
          market: originalBet.market,
          selection: originalBet.selection,
          odds: originalBet.odds,
          amount: chunkAmount,
          timestamp: Date.now(),
          status: 'matched',
          matchedAt: Date.now(),
          originalBetId: originalBet.id,
          isSplitBet: true,
          totalOriginalAmount: totalAmount,
          matchedAmount: chunkAmount,
          remainingAmount: 0,
        };

        splitBetIds.push(splitBet.id);
        currentMatchedAmount += chunkAmount;

        // Update the original bet
        setBets((prev) => 
          prev.map((bet) => 
            bet.id === originalBet.id
              ? {
                  ...bet,
                  matchedAmount: currentMatchedAmount,
                  remainingAmount: totalAmount - currentMatchedAmount,
                  splitBets: splitBetIds,
                  status: currentMatchedAmount >= totalAmount ? 'matched' : 'unmatched',
                }
              : bet
          )
        );

        // Add the split bet
        setBets((prev) => [splitBet, ...prev]);

      }, (index + 1) * 2000 + Math.random() * 3000); // Stagger the matching
    });
  };

  const generateBetChunks = (totalAmount: number): number[] => {
    // Generate realistic bet chunks (e.g., $100 bet might become $25, $30, $45)
    const chunks: number[] = [];
    let remaining = totalAmount;
    
    while (remaining > 0) {
      const maxChunk = Math.min(remaining, Math.floor(totalAmount * 0.6)); // Max 60% of total
      const minChunk = Math.max(10, Math.floor(remaining * 0.1)); // Min 10% of remaining
      const chunk = Math.floor(Math.random() * (maxChunk - minChunk + 1)) + minChunk;
      
      if (remaining - chunk < 10) {
        chunks.push(remaining); // Add remaining amount
        break;
      }
      
      chunks.push(chunk);
      remaining -= chunk;
    }
    
    return chunks;
  };

  const matchBet = (betId: string, matchedAmount: number) => {
    setBets((prev) =>
      prev.map((bet) =>
        bet.id === betId
          ? { 
              ...bet, 
              status: 'matched' as BetStatus, 
              matchedAt: Date.now(),
              matchedAmount: (bet.matchedAmount || 0) + matchedAmount,
              remainingAmount: (bet.remainingAmount || bet.amount) - matchedAmount,
            }
          : bet
      )
    );
  };

  const settleBet = (betId: string, result: 'win' | 'lose') => {
    setBets((prev) =>
      prev.map((bet) =>
        bet.id === betId
          ? { ...bet, status: 'settled' as BetStatus, result, settledAt: Date.now() }
          : bet
      )
    );
  };

  const getBetWithSplits = (betId: string): Bet[] => {
    const originalBet = bets.find(bet => bet.id === betId);
    if (!originalBet) return [];

    if (originalBet.splitBets && originalBet.splitBets.length > 0) {
      const splitBets = bets.filter(bet => originalBet.splitBets?.includes(bet.id));
      return [originalBet, ...splitBets];
    }

    return [originalBet];
  };

  const clearHistory = () => setBets([]);

  return (
    <BetHistoryContext.Provider value={{ 
      bets, 
      placeBet, 
      matchBet, 
      settleBet, 
      clearHistory, 
      getBetWithSplits 
    }}>
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
