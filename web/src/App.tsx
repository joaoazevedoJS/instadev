import React, { FC } from 'react';

import GlobalStyled from './assets/styles/global';

import SignUp from './pages/SignUp';

const App: FC = () => (
  <>
    <SignUp />
    <GlobalStyled />
  </>
);

export default App;
