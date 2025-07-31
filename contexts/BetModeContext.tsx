import React, { createContext, useContext, useState, ReactNode } from 'react';

type BetModeContextType = {
  betMode: 'coins' | 'cash';
  setBetMode: (mode: 'coins' | 'cash') => void;
};

const BetModeContext = createContext<BetModeContextType>({
  betMode: 'coins',
  setBetMode: () => {},
});

export const BetModeProvider = ({ children }: { children: ReactNode }) => {
  const [betMode, setBetMode] = useState<'coins' | 'cash'>('coins');
  return (
    <BetModeContext.Provider value={{ betMode, setBetMode }}>
      {children}
    </BetModeContext.Provider>
  );
};

export const useBetMode = () => useContext(BetModeContext);
