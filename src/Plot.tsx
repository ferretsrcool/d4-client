import React from 'react';

import { Chart } from 'react-charts';


interface props {
  data?: any; 
  className?: string;
  style?: object;
};

const convertSamples = (samples?: number[]): number[][] => {
  if (typeof samples === 'undefined') {
    throw Error('No samples provided');
  }
  return samples.map((sample: number, index: number) => [index * 0.1, sample]);
};

const convertData = (data: any): number[][][] => {
  if(typeof data[0] !== 'object') {
    return [convertSamples(data)];
  } else {
    return data.map((reading: reading) => convertSamples(reading.samples));
  }
};

const Plot = ({ data, className, style = {} }: props) => {
  if(typeof data === 'undefined') {
    throw Error("No samples or reading given");
  }
  const plotData = convertData(data);
  console.log(plotData);
  return (
  <div className={`chart ${className || ''}`}
      style={{
        width: "400px",
        height: "300px",
        ...style,
      }}
  >
    <Chart
      data={plotData}
      axes={[
        { primary: true, type: "linear", position: "bottom" },
        { type: "linear", position: "left" }
      ]}
    />
  </div>
  )
};

export default Plot;
