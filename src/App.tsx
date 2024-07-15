import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import RootNavigationView from './navigation/RootNavigationView';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigationView />
    </Provider>
  );
};

export default App;
