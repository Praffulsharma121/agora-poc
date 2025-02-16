import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Ensure this path is correct
import reportWebVitals from './reportWebVitals'; // Ensure this path is correct

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to measure performance, pass a function to log results
reportWebVitals();