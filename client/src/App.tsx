import React, { FC } from 'react';
import { AppRoute } from './AppRoute';

import { TreatmentsContextProvider } from './context/treatments';
import { UserContextProvider } from './context/user';

export const App: FC = () => {
  return (
    <TreatmentsContextProvider>
      <UserContextProvider>
        <AppRoute />
      </UserContextProvider>
    </TreatmentsContextProvider>
  );
};
