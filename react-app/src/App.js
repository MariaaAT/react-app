import './App.css';
import './table_style.css'
import {useState, useEffect} from "react";

function App() {
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
        "https://www.hvakosterstrommen.no/api/v1/prices/2023/01-31_NO5.json"
    )
        .then((response) => response.json())
        .then(setPrices)
        .then(() => setLoading(false))
        .catch(setError);
  }, []);

    if (loading) return <h1>Loading... </h1>;
    if (error) return <pre>{JSON.stringify(error)}</pre>;
    if (!prices) return null;

  return (
    !prices.length ? <p>This list is empty</p> :
        <table>
          <thead>
            <tr>
                <th scope="col" class="start">Start</th>
                <th scope="col" class="end">End</th>
                <th scope="col" class="ore">Ore</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => (
                <tr key={item.time_start}>
                    <td>{item.time_start}</td>
                    <td>{item.time_end}</td>
                    <td>{item.NOK_per_kWh}</td>
                </tr>
            ))
            }
          </tbody>
        </table>
  );
}

export default App;
