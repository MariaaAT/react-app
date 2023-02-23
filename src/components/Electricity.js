import React from 'react';
import {useState, useEffect} from "react";
import PlotElectricity from './PlotElectricity.js';
import {Link} from "react-router-dom";



function FormatPrices(prices, mva, omrnr) {  // This function is a formatter
    const ret = [];
    const mva_factor = (mva && !(omrnr === 4)) ? 1.25 : 1;
    const nettleie = (mva && !(omrnr === 4)) ? 32.7 : 0;
    for (let x in prices) {
        const options = {timeZone: 'Europe/Paris', timeStyle: "short"};
        ret.push({
            'time_start': new Date(prices[x].time_start).toLocaleTimeString("en-GB", options),
            'time_end': new Date(prices[x].time_end).toLocaleTimeString("en-GB", options),
            'NOK_mva': prices[x].NOK_per_kWh * 100 * mva_factor + nettleie
        })
    };

    return ret
}

function Electricity() {
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeDelta, setTimeDelta] = useState(0);
  const [mva, setMva] = useState(false);
  const [omrnr, setOmrnr] = useState(1);

  useEffect(() => {
    setLoading(true);
    let date = new Date();  // get current date in object format that allows us to use the next methods
    if (timeDelta === 1)  // tomorrow
        date.setDate(date.getDate() + 1);
    let day = String(date.getDate()).padStart(2, '0'); // get date in 2 digit format
    let month = String(date.getMonth() + 1).padStart(2, '0'); // get month in 2 digit format
    let year = date.getFullYear();

    fetch(
        `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_NO${omrnr}.json`
    )
        .then((response) => response.json())
        .then((data) => setPrices(FormatPrices(data, mva, omrnr)))  // Here we use the formatter
        .then(() => setLoading(false))
        .catch(setError);
  }, [timeDelta, mva, omrnr]);

  if (loading) return <h1>Loading... </h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!prices) return null;

// Converting to lists and then back to dictionaries show us that the list is not the right data structure in the first place
// This means we should stick to the dictionary
// Another problem is that React rerenders anything when any of these properties of these components change
// It should not matter that a property a colleague may add to this component changes
// The following lines run everytime something changes in this component but should only work once when the data is fetched

// This is why we transform the data once by changing
// .then((response) => response.json())
// to
// .then((response) => FormatPrices(response.json()))

// 2 tips to format prices:
// a) Use this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
// b) list.push({time_start: HH:MM, time_end: HH:MM, price: vvv})

  return (
    !prices.length ? <p>This list is empty</p> :
        <div>
        <main class="container">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/ElectricityPrices">Electricity Prices</Link></li>
              <li><Link to="/FillingLevels">Filling Levels</Link></li>
            </ul>
            </nav>
                <h3>Creating a table with React and styling it with Picocss </h3>
                <label> Select a region </label>
                <select value={omrnr} onChange={(event) => setOmrnr(parseInt(event.target.value))}>
                    <option value="1">Oslo / NO1 / Øst-Norge</option>
                    <option value="2">Kristiansand / NO2 / Sør-Norge</option>
                    <option value="3">Trondheim / NO3 / Midt-Norge</option>
                    <option value="4">Tromsø / NO4 / Nord-Norge</option>
                    <option value="5">Bergen / NO5 / Vest-Norge</option>
                </select>
                <label>Select a day</label>
                <select value={toString(timeDelta)} onChange={(event) => setTimeDelta(parseInt(event.target.value))}>
                    <option value="0">Today</option>
                    <option value="1">Tomorrow</option>
                </select>
                <fieldset>
                    <label for="switch">
                      <input type="checkbox" id="switch" name="switch" role="switch" checked={mva}
                      onChange={(event) => setMva(event.target.checked)}/>
                        Inkludert avgifter og mva
                    </label>
                </fieldset>
              <table>
              <thead>
                <tr>
                    <th scope="col" className="start">Start</th>
                    <th scope="col" className="end">End</th>
                    <th scope="col" className="ore">Ore</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((item) => (
                <tr key={item.time_start}>
                    <td>{item.time_start}</td>
                    <td>{item.time_end}</td>
                    <td>{(item.NOK_mva).toFixed(2)}</td>
                </tr>
                ))
                }
              </tbody>
            </table>
            <PlotElectricity prices={prices} mva={mva}/>
          </main>
        </div>
  );
}

export default Electricity
