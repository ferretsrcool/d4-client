import React from 'react';

import { Chart } from 'react-charts';


interface props {
  samples?: number[];
  readings?: reading[];
  className?: string;
  style?: object;
};

const convertSamples = (samples?: number[]): number[][] => {
  if (typeof samples === 'undefined') {
    throw Error('No samples provided');
  }
  return samples.map((sample: number, index: number) => [index * 0.1, sample]) 
};

const convertData = (data: any): number[][] => {
  if(typeof data[0] === 'number') {
    return convertSamples(data);
  } else {
    return data.map((reading: reading) => convertSamples(reading.samples));
  }
};

const Plot = ({ samples, readings, className, style = {} }: props) => {
  if(typeof samples === typeof readings === undefined) {
    throw Error("No samples or reading given");
  }
  const data = convertData(samples || readings);
  return (
  <div className={`chart ${className || ''}`}
      style={{
        width: "400px",
        height: "300px",
        ...style,
      }}
  >
    <Chart
      data={data}
      axes={[
        { primary: true, type: "linear", position: "bottom" },
        { type: "linear", position: "left" }
      ]}
    />
  </div>
  )
};

export default Plot;
