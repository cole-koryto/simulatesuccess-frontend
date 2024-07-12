import Plot from 'react-plotly.js';
import React from 'react';

//@ts-ignore
const PercentileGraph = ({ percentileHistory }) => {
  const layout = {
    title: {
      text: 'Percentile Balance History',
      font: {
        size: 24
      },
    },
    xaxis: {
      title: {
        text: 'Age',
        font: {
          size: 18,
        }
      },
    },
    yaxis: {
      title: {
        text: 'Balance',
        font: {
          size: 18,
        }
      }
    },
    legend: {
      x: 1,
      y: 0.5
    }
  };

  return (
    <Plot 
      data={Object.keys(percentileHistory).map((key: any) => ({
        x: Object.keys(percentileHistory[key]),
        y: Object.values(percentileHistory[key]),
        type: 'scatter',
        mode: 'lines+markers',
        name: `${key}%`
      }))}
      layout={layout}
      useResizeHandler
      className="w-full h-[80vh]"
    />
  )
}
export default PercentileGraph;