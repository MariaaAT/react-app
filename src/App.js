import './App.css';
import {useState, useEffect} from "react";

function FormatPrices(prices) {  // This function is a formatter
    let ret = [];
    for (let x in prices) {
        const options = {timeZone: 'Europe/Paris'};
        ret.push({
            'time_start': new Date(prices[x].time_start).toLocaleTimeString("en-GB", options),
            'time_end': new Date(prices[x].time_end).toLocaleTimeString("en-GB", options),
            'NOK': prices[x].NOK_per_kWh*100
        })
    };

    return ret
}

function App() {
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeDelta, setTimeDelta] = useState(0)

  useEffect(() => {
    setLoading(true);
    let date = new Date();  // get current date in object format that allows us to use the next methods
    if (timeDelta === 1)  // tomorrow
        date.setDate(date.getDate() + 1);
    let day = String(date.getDate()).padStart(2, '0'); // get date in 2 digit format
    let month = String(date.getMonth() + 1).padStart(2, '0'); // get month in 2 digit format
    let year = date.getFullYear();

    fetch(
        `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_NO5.json`
    )
        .then((response) => response.json())
        .then((data) => setPrices(FormatPrices(data)))  // Here we use the formatter
        .then(() => setLoading(false))
        .catch(setError);
  }, [timeDelta]);

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
        <h3>Creating a table with React and styling it with css </h3>
        <label>
            Select a day
        </label>
          <select onChange={(event) => setTimeDelta(parseInt(event.target.value))}>
             <option value="0">Today</option>
             <option value="1">Tomorrow</option>
          </select>
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
                    <td>{(item.NOK).toFixed(2)}</td>
                </tr>
            ))
            }
          </tbody>
        </table>
    </div>
  );
}

export default App;
