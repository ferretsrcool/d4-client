import React, { Component } from 'react';

import { Chart } from 'react-charts';


interface props {
  samples: number[];
  className?: string;
};

const convertData = (samples: number[]): number[][] => (
  samples.map((sample: number, index: number) => [index * 0.1, sample]) 
);

const Plot = ({ samples, className }: props) => (
  <div className={`chart ${className || ''}`}
      style={{
        width: "400px",
        height: "300px"
      }}
  >
    <Chart
      data={[
        {
          label: 'Voltage change over time',
          data: convertData(samples),
        }
      ]}
      axes={[
        { primary: true, type: "linear", position: "bottom" },
        { type: "linear", position: "left" }
      ]}
    />
  </div>
);

export default Plot;
