import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Exercise1 from './pages/Exercise1';
import Exercise2 from './pages/Exercise2';
import "./styles/reset.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/exercise1" element={<Exercise1 />} />
          <Route path="/exercise2" element={<Exercise2 />} />
        </Routes>
    </Router>
  </QueryClientProvider>
);

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(<App />);
