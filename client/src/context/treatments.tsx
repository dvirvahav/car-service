import React from 'react';

import { Context, createContext, useContext, useState } from 'react';
import { Treatment, TreatmentsState } from '../types/types';

export const useTreatmentsContext = () => useContext(TreatmentsContext);
export const TreatmentsContext: Context<TreatmentsState> =
  createContext<TreatmentsState>({
    treatments: [],
    setTreatments: () => {},
  });

export function TreatmentsContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  return (
    <TreatmentsContext.Provider value={{ treatments, setTreatments }}>
      {children}
    </TreatmentsContext.Provider>
  );
}
