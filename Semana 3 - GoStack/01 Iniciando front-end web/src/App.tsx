import React from 'react';
import GlobalStyle from './styles/global';
import Routes from './routes';
import AppProvider from './hooks';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => (
  <Router>
    <GlobalStyle/>
    
    <AppProvider>
        <Routes/>
    </AppProvider>
  </Router>
);

export default App;
