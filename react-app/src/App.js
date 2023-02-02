import './App.css';
import './table_style.css'
import {useState, useEffect} from "react";

function App() {
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(prices)
  useEffect(() => {
    setLoading(true);
    let date = new Date(); // get current date in object format that allows us to use the next methods
    let day = date.getDate();
    let month = date.getMonth() + 1; // 0: JAN, 1: FEB ... That's why we sum 1, to actually get the current month
    let year = date.getFullYear();

    if (day < 10) {
      day = '0' + day;
    };

    if (month < 10) {
      month = `0${month}`;
    };

    fetch(
        `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_NO5.json`
    )
        .then((response) => response.json())
        .then(setPrices)
        .then(() => setLoading(false))
        .catch(setError);
  }, []);

    if (loading) return <h1>Loading... </h1>;
    if (error) return <pre>{JSON.stringify(error)}</pre>;
    if (!prices) return null;

// Getting the time and prices arrays

    const emptyListStart = [];
    const emptyListEnd = [];
    const emptyListPrices = [];

    for (var i = 0; i < prices.length; ++i) {
        emptyListStart.push(prices[i].time_start);
        emptyListEnd.push(prices[i].time_end);
        emptyListPrices.push(prices[i].NOK_per_kWh*100);
    };

    let finalList1 = [...new Set(emptyListStart.map(x => x.split('T')[1]))];
    let finalList2 = [...new Set(finalList1.map(x => x.split('+')[0]))];  // This is the list that contains the hours (start)
    let finalList3 = [...new Set(emptyListEnd.map(x => x.split('T')[1]))];
    let finalList4 = [...new Set(finalList3.map(x => x.split('+')[0]))];  // This is the list that contains the hours (end)

// Creating indexed dictionaries on times

    const start_time = {};
    const end_time = {};
    for (var a = 0; a < finalList2.length; ++a) {
        start_time[a] = finalList2[a];
        end_time[a] = finalList4[a];
        };

  return (
    !prices.length ? <p>This list is empty</p> :
        <div>
        <h3>Creating a table with React and styling it with css </h3>
        <table>
          <thead>
            <tr>
                <th scope="col" className="start">Start</th>
                <th scope="col" className="end">End</th>
                <th scope="col" className="ore">Ore</th>
            </tr>
          </thead>
          <tbody>
                {finalList2.map((item, index) => (
                <tr key={index}>
                    <td>{item}</td>
                    <td>{finalList4[index]}</td>
                    <td>{emptyListPrices[index]}</td>
                </tr>
            ))
            }
          </tbody>
        </table>
    </div>
  );
}

export default App;
