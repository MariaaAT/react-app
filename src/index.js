import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@picocss/pico/css/pico.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <main class="container">
   <App />
  </main>
  </React.StrictMode>
);
