import React from 'react';
import Plot from "react-plotly.js";

function Graph({prices, mva}) {
    const nok = [];
    const start = [];

    for (let i = 0; i < prices.length; i++) {
        nok.push(prices[i].NOK_mva);
        start.push(prices[i].time_start)
    };

    return (
      <Plot
        data={[
          {
            x: start,
            y: nok,
            name: "",
            type: 'scatter',
            mode: 'lines',
            line: {shape: 'hv'},
            hovertemplate: "%{y} Øre",
          },
        ]}
        layout={{
          width: 600,
          height: 420,
          title: `Electricity prices ${mva ? '(inkludert avgifter og mva)' : '(exkludert avgifter og mva)'}`,
          hovermode: "x unified",
          hoverlabel: {namelength: -1},
          showlegend: false,
          xaxis: {nticks: 12, tickangle: -35},
          tickmode: "auto",
        }}

      />
    );
}

export default Graph;