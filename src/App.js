import './App.css';
import React from 'react';
import Electricity from './components/Electricity.js';
import FillingLevels from './components/FillingLevels.js';
import {Link} from "react-router-dom";

function Home(){
  return (
    <h1>My Website</h1>
  )

}


function App() {

  return (
    <div>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ElectricityPrices">Electricity Prices</Link></li>
        <li><Link to="/FillingLevels">Filling Levels</Link></li>
      </ul>
    </nav>
    <Home />
    </div>
  );
}

export default App
