import React from 'react';

import { Chart } from 'react-charts';


interface props {
  data: string[] | reading[]; 
  scale?: string;
  className?: string;
  style?: object;
};

const convertSampleToScale = (sample: string, scale: string): string => {
  if (scale === 'linear') {
    return sample;
  }
  return sample.length.toString();
}

const convertSamples = (samples: string[], scale: string): (string | number)[][] => {
  if (typeof samples === 'undefined') {
    throw Error('No samples provided');
  }
  return samples.map((sample: string, index: number) => [index * 0.1, convertSampleToScale(sample, scale)]);
};

const convertData = (data: any[], scale: string): (string | number)[][][] => {
  if(typeof data[0] === 'string') {
    return [convertSamples(data, scale)];
  } else {
    return data.map((reading: reading) => {
      if(typeof reading.samples === 'undefined') {
        throw Error('Cannot plot reading with no samples provided.');
      } 
      return convertSamples(reading.samples, scale);
    });
  }
};

const Plot = ({ data, scale, className, style = {} }: props) => {
  if (typeof data === 'undefined') {
    throw Error('No samples or reading given');
  }
  if (typeof scale === 'undefined') {
    scale = 'linear';
  }
  if (scale !== 'linear' && scale !== 'log') {
    throw Error('Invalid scale being used');
  }
  const plotData: (string | number)[][][] = convertData(data, scale);
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
          { type: scale, position: "left" }
        ]}
      />
    </div>
  )
};

export default Plot;
