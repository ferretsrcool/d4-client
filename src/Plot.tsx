import React from 'react';

import { Chart } from 'react-charts';


interface props {
  data?: string[] | reading[]; 
  className?: string;
  style?: object;
};

const convertSamples = (samples?: string[]): (string | number)[][] => {
  if (typeof samples === 'undefined') {
    throw Error('No samples provided');
  }
  return samples.map((sample: string, index: number) => [index * 0.1, sample]);
};

const convertData = (data: any): (string | number)[][][] => {
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
  const plotData: (string | number)[][][] = convertData(data);
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
