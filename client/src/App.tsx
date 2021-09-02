import React from 'react';
import './styles/main.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import LandingPage from './components/LandingPage';
import DistrictPage from './components/DistrictPage';
import PollingPage from './components/PollingPage';
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/tk/:id' component={DistrictPage} />
          <Route exact path='/uk/:id' component={PollingPage} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
