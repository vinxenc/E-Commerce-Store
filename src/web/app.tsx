import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Loading } from './components/loading';
import router from './routes';

const App = () => {
  return <RouterProvider router={router} fallbackElement={Loading()} />;
};

export default App;
