import './App.css';
import React from 'react';
import {Link} from "react-router-dom";

function Home(){
  return (
    <article>
    <h6>Hey, I'm María 👋🏻</h6>
    <u>About me professionally</u> <br></br>
    <p>
        💻 Given the importance of data-driven decision-making, I am currently teaching myself programming to pursue a
        career as a data scientist. My goal is to apply my skills and knowledge to real-world challenges.
    </p>
    <p>
       🛠 Technologies: <br></br>
        * Python, pandas, Numpy, matplotlib, plotly, StreamLit, for data acquisition, evaluation, interpretation and
        visualisation <br></br>
        * JavaScript, HTML, CSS, React, yo build more customised interactive user interfaces. <br/>
        * SQL, SQLite, to access and manage databases.<br></br>
    </p>
    <p>
       👩🏻‍💼 I am a detail-oriented, analytical thinker who thrives on collaboration and teamwork. I am proactive, skilled in
        time management, and able to handle different projects simultaneously. I am eager to join a dynamic organisation
        where I can use my skills and passion to make a meaningful impact on the world.
    </p>
    <u>About me personally</u> <br></br>
    <p>
       🌍 I'm a Spanish citizen currently living in Oslo (Norway). Before that, I lived in Faro (Portugal) where
        I studied my M.Sc. And before pandemic, I lived in Leeuwarden (The Netherlands). Yes, indeed, I love
        travelling but not so much moving in and out from countries. I intent to stay in Oslo, hopefully for a long
        time. This country has marvellous landscapes which improve during the winter all covered by snow.
    </p>
    <p>
        I like sports, specially volleyball 🏐. I played it for 10 years and I have to say that I miss all those
        good years. Right now I do yoga 🧘🏻‍♀️and would like to learn skiing 🎿️.
    </p>
    <p>
       📚 I love reading. I enjoy reading my book just laying down on the beach in the summer or drinking a very
        hot coffee in the winter.
    </p>
    </article>
  )

}


function App() {

  return (
    <div>
    <main class="container">
    <nav>
      <ul>
        <li><Link to="/">About me</Link></li>
        <li><Link to="/ElectricityPrices">Electricity Prices</Link></li>
        <li><Link to="/FillingLevels">Filling Levels</Link></li>
      </ul>
    </nav>
    <Home />
    </main>
    </div>
  );
}

export default App
