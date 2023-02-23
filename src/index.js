import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@picocss/pico/css/pico.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Electricity from './components/Electricity.js';
import FillingLevels from './components/FillingLevels.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/ElectricityPrices" element={<Electricity />} />
            <Route path="/FillingLevels" element={<FillingLevels />} />
        </Routes>
    </BrowserRouter>
);
  /*<React.StrictMode>
  <main class="container">
   <App />
  </main>
  </React.StrictMode>*/

