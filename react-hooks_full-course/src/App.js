import React from 'react';
import Main from './main';
import Alert from './alert/alert';
import { AlertProvider } from './alert/alertContext';

function App() {
  return (
    <AlertProvider>
      <div className="container pt-3">
        <Alert />
        <Main />
      </div>
    </AlertProvider>
  );
}

export default App;
