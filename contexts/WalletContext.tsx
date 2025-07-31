// ✅ WalletContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type WalletContextType = {
  coinBalance: number;
  cashBalance: number;
  deduct: (amount: number, mode: 'coins' | 'cash') => boolean;
  add: (amount: number, mode: 'coins' | 'cash') => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [coinBalance, setCoinBalance] = useState(1000);
  const [cashBalance, setCashBalance] = useState(100); // Starting with $100 cash

  const deduct = (amount: number, mode: 'coins' | 'cash') => {
    if (mode === 'coins') {
      if (coinBalance >= amount) {
        setCoinBalance(coinBalance - amount);
        return true;
      }
    } else if (mode === 'cash') {
      if (cashBalance >= amount) {
        setCashBalance(cashBalance - amount);
        return true;
      }
    }
    return false;
  };

  const add = (amount: number, mode: 'coins' | 'cash') => {
    if (mode === 'coins') {
      setCoinBalance((prev) => prev + amount);
    } else if (mode === 'cash') {
      setCashBalance((prev) => prev + amount);
    }
  };

  return (
    <WalletContext.Provider value={{ coinBalance, cashBalance, deduct, add }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
};
