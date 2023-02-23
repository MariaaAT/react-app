import React from 'react';
import {useState, useEffect} from "react";
import Plot from "react-plotly.js";
import {Link} from "react-router-dom";

function FillingLevels() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [omrnr, setOmrnr] = useState(1);
  const [levels, setLevels] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
        "https://biapi.nve.no/magasinstatistikk/api/Magasinstatistikk/HentOffentligData"
    )
        .then((response) => response.json())
        .then(setLevels)
        .then(() => setLoading(false)) // we set back the loading to false because it's no longer loading; we already have the data
        .catch(setError);
  }, []);

  if (loading) return <h1>Loading... </h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!levels) return null;

// From the JSON file, we get the values that contain EL in omrType and at the same time are from omrnr 1
  const filt = levels.filter(item => item.omrType === "EL" && item.omrnr === Number(`${omrnr}`));
  console.log(filt);
  console.log(typeof {omrnr});
  console.log(typeof 1);
// Get date object
  for (let x in filt) {
  filt[x].dato_Id = new Date(filt[x].dato_Id);
  };
// Sort by date
  filt.sort(function(a, b) {
    var c = new Date(a.dato_Id);
    var d = new Date(b.dato_Id);
    return c-d;
  });
// Get last 53 items. These are the values we will plot (fyllingsgrad)
  const last_items = filt.slice(-53);
  const plotting_values = [];
  const x_values = [];
  const range = Array.from({length: 53}, (x, i) => i);

    for (let i = 0; i < last_items.length; i++) {
        plotting_values.push(last_items[i].fyllingsgrad);
        x_values.push(last_items[i].iso_uke);
    };

// Get list grouped by week
  const week_filling_levels = filt.reduce(function (r, a) {
     // if r[a.iso_uke] fails (key does not exist yet) create an entry with an empty list
     // if a.iso_uke not in r:
     //     r[a.iso_uke] = []
     r[a.iso_uke] = r[a.iso_uke] || [];
     r[a.iso_uke].push(a["fyllingsgrad"]);
     return r;
  }, Object.create(null));
// Get max and min values for each week
    const maxes = [];
    const mins = [];
    for (var lvls of Object.values(week_filling_levels)) {
        maxes.push(Math.max.apply(null, lvls));
        mins.push(Math.min.apply(null, lvls));
    };
  return (
    <div>
    <main class="container">
      <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ElectricityPrices">Electricity Prices</Link></li>
        <li><Link to="/FillingLevels">Filling Levels</Link></li>
      </ul>
      </nav>
      <label> Select a region </label>
          <select value={omrnr} onChange={(event) => setOmrnr(Number(event.target.value))}>
            <option value="1">Oslo / NO1 / Øst-Norge</option>
            <option value="2">Kristiansand / NO2 / Sør-Norge</option>
            <option value="3">Trondheim / NO3 / Midt-Norge</option>
            <option value="4">Tromsø / NO4 / Nord-Norge</option>
            <option value="5">Bergen / NO5 / Vest-Norge</option>
          </select>
      <Plot
        data={[
          {
            x: range,
            y: maxes,
            mode: "lines",
            name: "Historisk max",
            line: {color: "lightskyblue"},
            hovertemplate: "%{y} %",
          },
          {
            x: range,
            y: mins,
            mode: "lines",
            name: "Historisk min",
            line: {color: "lightskyblue"},
            fill: 'tonextx',
            fillcolor: "lightskyblue",
            hovertemplate: "%{y} %",
          },
          {
            x: range,
            y: plotting_values,
            type: 'scatter',
            mode: 'lines',
            name: "Filling Capacity",
            line: {color: "black"},
            hovertemplate: "%{y} %",
          },
        ]}
        layout={{
          width: 600,
          height: 420,
          title: `Lake Filling Capacity in Region ${omrnr}`,
          hovermode: "x unified",
          hoverlabel: {namelength: -1},
          showlegend: false,
        }}
      />
      </main>
    </div>
    );

}
export default FillingLevels